import React from 'react';
import { Badge } from '../ui/badge';
import timelineElements from './elements';

export function Timeline() {
    return (
      <div className="flex flex-col items-center justify-center">
        {timelineElements.map((element, index) => (
          <div key={index} className="group">
            <Badge 
            style={{ transformOrigin: "top", zIndex: 999 }}
            className="transform-origin-center flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-background drop-shadow-xl transition duration-100 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-transparent">
                <span className="text-2xl font-semibold text-black dark:text-white">{element.id}</span>
            </Badge>
            {index < timelineElements.length - 1 && (
              <div className="dark:white mx-auto h-24 w-1 self-center bg-white py-2 drop-shadow-sm" style={{borderStyle: "dotted"}}></div>
            )}
          </div>
        ))}
      </div>
    );
  }