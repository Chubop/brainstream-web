"use client";

import { useState } from 'react';
import { Button } from "./button"
import { IconPlus, IconSpinner } from "./icons";
import toast from "react-hot-toast";
import { createStream } from '@/app/actions';
import { useRouter } from 'next/navigation';

type NewStreamButton = {
    children?: string;
}

const NewStreamButton: React.FC<NewStreamButton> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    setIsLoading(true);
    try {
      console.log("About to call createStream...");
      const data = await createStream();
  
      if (data && data.stream_id) {
        toast.success(`Stream ${data.stream_id} created`);
        router.push(`/stream/${data.stream_id}`);
      }
    } catch (error) {
      console.error("Error calling createStream:", error);
      toast.error("Failed to create stream");
    }
    setIsLoading(false);
  };

  return(
      <div className="flex w-full justify-center px-2 pb-2">
          <Button onClick={onClick} variant={"ghost"} className={`w-full bg-background text-center ${isLoading ? "border-2 dark:border-zinc-800" : ""}`}>
              {isLoading ? <IconSpinner className="mr-2 animate-spin" /> : <IconPlus className="mr-2" />} {children || 'New Stream'}
          </Button>
      </div>
  )
}

export default NewStreamButton;