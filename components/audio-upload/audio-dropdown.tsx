"use client";

import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { IconHamburger, IconMicrophone, IconUpload } from '../ui/icons';
import { SetStateAction } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type AudioDropdownProps = {
    setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>
};

export default function AudioDropdown({setIsDialogOpen}: AudioDropdownProps) {

    const router = useRouter();
    const pathname = usePathname();

    // Handler for creating a new recording
    const handleNewRecording = () => {
        // Split the current pathname
        const path = pathname.split("/");
        // Check if the current page is a stream
        console.log(path);
        if(path[1] === "stream"){
            // Extract the stream ID from the path
            const streamId = path[2];
            // Navigate to the record page with the stream ID as a query parameter
            router.push(`/record?stream=${streamId}`)
        }
        else{
            // Navigate to the record page without any query parameters
            router.push("/record");
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                    className={cn(
                        buttonVariants({
                            size: 'sm',
                            variant: 'outline',
                        }),
                        'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4'
                    )}
                >
                    <IconHamburger />
                    <span className="sr-only">New Chat</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                    <IconUpload className="mr-2" />
                    Upload a Recording
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleNewRecording}>
                    <IconMicrophone className="mr-2"/>
                    New Recording
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
