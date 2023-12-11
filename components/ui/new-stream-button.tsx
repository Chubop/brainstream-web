"use client";

import { useState } from 'react';
import { fetcher } from "@/lib/utils";
import { Button } from "./button"
import { IconPlus, IconSpinner } from "./icons";
import toast from "react-hot-toast";
import { createStream } from '@/app/actions';

type NewStreamButton = {
    children?: string;
}

const NewStreamButton: React.FC<NewStreamButton> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
      setIsLoading(true);
      try {
        console.log("awaiting createStream...");
        const data = await createStream();

        if (data && data.stream_id) {
          toast.success(`Stream ${data.stream_id} created`);
        }
      } catch (error) {
        // Handle errors, possibly show an error toast
        console.error("Failed to create stream:", error);
        toast.error("Failed to create st  ream");
      }
      setIsLoading(false);
  };

  return(
      <div className="flex justify-center w-full px-2 pb-2">
          <Button onClick={onClick} variant={"ghost"} className={`bg-background text-center w-full ${isLoading ? "border-2 dark:border-zinc-800" : ""}`}>
              {isLoading ? <IconSpinner className="mr-2 animate-spin" /> : <IconPlus className="mr-2" />} {children || 'New Stream'}
          </Button>
      </div>
  )
}

export default NewStreamButton;