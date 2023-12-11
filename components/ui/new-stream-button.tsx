"use client";

import { useState } from 'react';
import { fetcher } from "@/lib/utils";
import { Button } from "./button"
import { IconPlus, IconSpinner } from "./icons";
import toast from "react-hot-toast";

type NewStreamButton = {
    children?: string;
}

const NewStreamButton: React.FC<NewStreamButton> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        setIsLoading(true);
        try {
          // Assuming the route is exposed as an API route in a Next.js application
          const data = await fetcher('/api/stream/init', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ /* any necessary body content */ }),
          });

          if (data && data.stream_id) {
            toast.success("Stream created");
          }
        } catch (error) {
          // Handle errors, possibly show an error toast
          console.error("Failed to create stream:", error);
          toast.error("Failed to create stream");
        }
        setIsLoading(false);
      };

    return(
        <div className="flex justify-center w-full">
            <Button onClick={onClick} variant={"ghost"} className="bg-background text-center w-5/6">
                {isLoading ? <IconSpinner className="mr-2 animate-spin" /> : <IconPlus className="mr-2" />} New Stream
            </Button>
        </div>
    )
}

export default NewStreamButton;