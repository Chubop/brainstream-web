// AudioDropzone.tsx
import { useTheme } from 'next-themes';
import { useDropzone } from 'react-dropzone';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { UploadIcon } from '@radix-ui/react-icons';

interface AudioDropzoneProps {
    onDrop: (acceptedFiles: File[]) => void;
    files: File[];
}

const AudioDropzone: React.FC<AudioDropzoneProps> = ({ onDrop, files: acceptedFiles }) => {
  const { theme } = useTheme();
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({ 
    onDrop,
    accept: {
      "audio/mpeg": [".mp3", ".MP3"],
      "audio/wav": [".wav", ".WAV"],
      "audio/mp4": [".mp4", ".MP4", ".m4a", ".M4A"],
    }
  });  
  const fileNames = acceptedFiles.map(file => <div key={file.name}>{file.name}</div>);

  let className = 'flex flex-col items-center py-8 border-2 rounded text-gray-500 outline-none transition-colors duration-200 ease-in-out';
  className += theme === 'dark' ? ' bg-dark' : ' bg-white';

  if (isDragActive) {
    className += theme === 'dark' ? ' border-primary' : ' border-blue-600';
  } else if (isDragAccept) {
    className += theme === 'dark' ? ' border-secondary' : ' border-green-500';
  } else if (isDragReject) {
    className += theme === 'dark' ? ' border-destructive' : ' border-red-500';
  }

  return (
    <>
      <div {...getRootProps()} className={cn(className, 'cursor-pointer')}>
        <input {...getInputProps()} />
        <div className='flex flex-col text-center h-10 justify-center select-none'>
          {!fileNames.length ? (
            <div><span className='font-extrabold'>Click or drag your file here.</span></div>
          ) : (
            <div>{fileNames[0]}</div>
          )}
          {!fileNames.length && <div>Accepts .mp3, .m4a, .wav, and .mp4.</div>}
        </div>
      </div>
    </>
  );
};

export default AudioDropzone;