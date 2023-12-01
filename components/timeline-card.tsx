'use client';

import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/pop-over";
import { Separator } from "./ui/separator";
import React from "react";

interface TimelineCardProps {
    id: number;
    date: string;
    stream: string;
    description: string;
}

export function TimelineCard({ id, date, stream, description }: TimelineCardProps) {

    function abbreviateDate(dateString: string) {
        const cleanedDateString = dateString.replace(/(st|nd|rd|th),/, ',');
        const date = new Date(cleanedDateString);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return <span><span className="font-extrabold">{month} </span> {day}</span>
    }

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <Popover onOpenChange={setIsOpen} open={isOpen} >
                <PopoverTrigger>
                    <div className="flex items-center justify-center">
                        <Badge
                            style={{ transformOrigin: "top"}}
                            className="transform-origin-center z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-background drop-shadow-xl transition duration-100 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-transparent">
                            <span className="text-2xl font-semibold text-black dark:text-white">{id}</span>
                        </Badge>
                        <h4 className="absolute ml-40 text-lg">{abbreviateDate(date)}</h4>
                    </div>
                </PopoverTrigger>

                <PopoverContent side="bottom" align="end" alignOffset={50} sideOffset={0} 
                className="z-0 h-48 w-72 p-2 px-4">
                    {/* This is the content that will appear in the popover */}
                    <h1>Events</h1>
                    <Separator className="mb-1" />
                    <h1>{description}</h1>
                </PopoverContent>
                
            </Popover>

        </>
    );
}