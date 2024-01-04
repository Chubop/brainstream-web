"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { IconMicrophone, IconSpinner } from "../ui/icons";
import { useRouter, useSearchParams } from "next/navigation";
import useFileUpload from "@/lib/hooks/use-file-upload";
import { processAudio } from "@/app/actions";
import { useUserId } from "@/lib/hooks/use-user-id";
import { useCreateStream } from "@/lib/hooks/use-create-stream";
import { cn } from "@/lib/utils";

type AudioCircleProps = {
    children: React.ReactNode,
    recording: boolean,
    amplitude?: number,
    sm?: boolean,
    md?: boolean,
    lg?: boolean,
    multiplier?: number,
    className?: string,
  }


const AudioCircle = ({children, recording, amplitude = 0, sm, md, lg, multiplier = 1, className}: AudioCircleProps) => {

    let size = "8rem"; // Default size
    if (sm) size = "8rem";
    if (md) size = "16rem";
    if (lg) size = "20rem";

    const adjustedAmplitude = recording ? (amplitude * multiplier) : 0

    return(
        <div
        className={`flex items-center justify-center rounded-full text-black ${className || ''}`}
        style={{
            height: `calc(${size} + ${adjustedAmplitude}px)`,
            width: `calc(${size} + ${adjustedAmplitude}px)`,
            maxWidth: `calc(${size} * 2)`,
            maxHeight: `calc(${size} * 2)`,
            transition: 'height 0.05s ease, width 0.05s ease' // Add this line
        }}
        >
            {children}
        </div>
    )
}

type RecordProps = {}

export default function Recorder(props: RecordProps) {
  // states
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [amplitude, setAmplitude] = useState(0);
  const [isLoading, setLoading] = useState(false);
  
  // refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // hooks
  const params = useSearchParams()
  const { uploadFile, status } = useFileUpload();
  const userId = useUserId();
  const { createStreamOnly } = useCreateStream();
  const router = useRouter();


  const handleRecording = () => {
    console.log('handleRecording called, recording state:', recording);
    if (mediaRecorderRef.current) {
      if (recording) {
        // When stop is called, the dataavailable event will be fired one last time.
        mediaRecorderRef.current.stop();
        console.log("mediaRecorder.ref.current.stop()");
        setRecording(false);
      } else {
        // Start recording without a timeslice to only get one Blob when stopping.
        mediaRecorderRef.current.start();
        setRecording(true);
      }
    }
  };

  
  const handleDataAvailable = async (event: BlobEvent) => {
    setLoading(true);
    const fileName = 'user_recording';
    const audioBlob = event.data;
    // Calculate and log the duration of the audio file/blob
    const audioDuration = audioBlob.size / (128 * 1024); // Approximate duration in seconds for 128 kbps
    console.log(`Audio duration: ${audioDuration.toFixed(2)} seconds`);
    const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
    const uploadSuccess = await uploadFile(audioFile, fileName); // Adjust the file name as needed
    
    let streamId = params.get("stream");
    if(!streamId){
        streamId = await createStreamOnly();
    }

    const requestData = {
        user_id: userId,
        stream_id: streamId || "",
        audio_name: fileName,
        audio_file_blob_name: fileName + '.wav',
        transcription_method: 'DG',
        category: 'General',
    }
    await processAudio(requestData);

    if (uploadSuccess) {
      console.log('File uploaded successfully');
      router.refresh();
      router.push(`/stream/${streamId}`)
    } else {
      console.error('File upload failed');
    }
    setLoading(false);
  };


  const renderMicrophoneIcon = () => {
    if (!permission) {
      return "Click for Permission";
    }
    if (isLoading) {
      return <IconSpinner className="h-12 w-12 animate-spin" />;
    } else if (recording) {
      return (
        <IconMicrophone className={`h-12 w-12 animate-pulse text-red-500`}/>
      );
    } else {
      return <IconMicrophone className="h-12 w-12" />;
    }
  };


  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setPermission(true);
        setStream(streamData);
        mediaRecorderRef.current = new MediaRecorder(streamData);
        mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);

        // Set up Web Audio API to process audio stream
        audioContextRef.current = new AudioContext();
        const source = audioContextRef.current.createMediaStreamSource(streamData);
        const processor = audioContextRef.current.createScriptProcessor(2048, 1, 1);

        processor.onaudioprocess = (audioProcessingEvent) => {
          const audioData = audioProcessingEvent.inputBuffer.getChannelData(0);
          let sum = 0;
          for (let i = 0; i < audioData.length; i++) {
            sum += audioData[i] * audioData[i];
          }
          let average = sum / audioData.length;
          let rootMeanSquare = Math.sqrt(average);
          setAmplitude(rootMeanSquare * 1000); 
        };

        source.connect(processor);
        processor.connect(audioContextRef.current.destination);
        

      } catch (err) {
        console.log(err);
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };

  // Cleanup function to disconnect audio nodes and context
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div
      onClick={() => {
        if (!permission) {
          getMicrophonePermission();
        } else if(!isLoading){
          handleRecording();
        }
      }}
      className={cn("flex h-96 w-96 items-center justify-center", !isLoading && "cursor-pointer")}>
      <AudioCircle recording={recording} lg amplitude={amplitude} multiplier={0.1} className="to slate-200 bg-gradient-to-r from-gray-200 dark:from-zinc-800 dark:to-zinc-700">
        <AudioCircle recording={recording} md className={`animate-gradient-x bg-gradient-to-r from-zinc-300 to-zinc-100 dark:from-zinc-700 dark:to-zinc-500`}>            
          <AudioCircle recording={recording} sm amplitude={amplitude} multiplier={0.75} className="bg-gray-50 dark:bg-slate-200">
            <div className="align-center flex items-center justify-center text-xs">
              {renderMicrophoneIcon()}
            </div>
          </AudioCircle>
        </AudioCircle>
      </AudioCircle>
    </div>
  )
}