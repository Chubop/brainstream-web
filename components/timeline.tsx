import React, { useState } from 'react';
import { Badge } from './ui/badge';
import timelineElements from './timeline/elements';
import { useInView } from 'react-intersection-observer';
import { Popover, PopoverContent, PopoverTrigger } from './ui/pop-over';
import { TimelineCard } from '@/components/timeline-card';

export function Timeline() {
  const NEW_ELEMENT_COUNT = 5
  const [elementsToShow, setElementsToShow] = useState(NEW_ELEMENT_COUNT); // Initial number of elements to show
  const { ref, inView } = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inView) {
      setElementsToShow((prev) => prev + NEW_ELEMENT_COUNT); // Load 5 more elements when the ref comes into view
    }
  }, [inView]);

  return (
    <div className="flex flex-col items-center justify-center">
    {timelineElements.slice(0, elementsToShow).map((element, index) => (
      <div key={index} className="group">
        <TimelineCard id={element.id} date={element.date} stream={element.stream} description={element.description}/>
        {index < timelineElements.length - 1 && (
          <div className="dark:white mx-auto h-48 w-1 self-center bg-gray-700 py-2 drop-shadow-sm" style={{borderStyle: "dotted"}}></div>
        )}
      </div>
    ))}
      <div ref={ref}></div> {/* This div will be used to observe when it comes into view */}
    </div>
  );
}