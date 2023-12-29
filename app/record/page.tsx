"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useUserId } from '@/lib/hooks/use-user-id';
import { notFound } from 'next/navigation';
import Recorder from '@/components/audio-upload/recorder';

export default function RecordPage() {
  const [isRecording, setIsRecording] = useState(false);
  const userId = useUserId();

  const handleRecording = () => {
    // Implement recording logic here
    setIsRecording(!isRecording);
  };

    // if (!userId) return notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 pt-16 w-full">
      <div className="rounded-lg border bg-background p-8 flex justify-center items-center flex-col">
        <div className='w-full'>
          <h1 className="mb-2 text-lg font-semibold text-left">Record</h1>
        </div>
        <Recorder />
      </div>
    </div>
  );
}