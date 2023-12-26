'use client';

import { getStreams, removeChat, shareChat } from '@/app/actions';
import { SidebarActions } from '@/components/sidebar-actions';
import { SidebarItem } from '@/components/sidebar-item';
import { Stream } from '@/lib/types';
import React from 'react';
import { useEffect, useState } from 'react';
import { Skeleton } from './skeleton';

export interface SidebarListProps {
    userId: string;
}

export function SidebarList({ userId }: SidebarListProps) {
    const [streams, setStreams] = useState<Stream[] | null>(null);

    useEffect(() => {
        const fetchStreams = async () => {
            const streamsData = await getStreams();
            setStreams(streamsData);
        };

        fetchStreams();
    }, [userId]);

    if (streams === null) {
        return (
            <div className="flex-1 overflow-auto">
                <div className="space-y-2 px-2">
                    {Array.from({ length: 12 }, (_, index) => (
                        <Skeleton
                            key={index}
                            className={`${
                                index === 0 ? 'mb-1' : 'mb-4'
                            } h-8 mt-2`}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-auto">
            {streams.length ? (
                <div className="space-y-2 px-2">
                    {streams.map(
                        (stream: Stream) =>
                            stream.stream_name.length > 0 && (
                                <React.Fragment key={stream.stream_id}>
                                    <SidebarItem stream={stream}>
                                        <SidebarActions
                                            stream={stream}
                                            removeChat={removeChat}
                                            shareChat={shareChat}
                                        />
                                    </SidebarItem>
                                </React.Fragment>
                            )
                    )}
                </div>
            ) : (
                <div className="p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        No recording history
                    </p>
                </div>
            )}
        </div>
    );
}

// return (
//   <div className="flex-1 overflow-auto">
//     {streams?.length ? (
//       <div className="space-y-2 px-2">
//         {chats.map(
//           chat =>
//             chat && (
//               <SidebarItem key={chat?.id} chat={chat}>
//                 <SidebarActions
//                   chat={chat}
//                   removeChat={removeChat}
//                   shareChat={shareChat}
//                 />
//               </SidebarItem>
//             )
//         )}
//       </div>
//     ) : (
//       <div className="p-8 text-center">
//         <p className="text-sm text-muted-foreground">No recording history</p>
//       </div>
//     )}
//   </div>
// )
