"use server";

import { getChats, getStream, getStreams, getUserDetails, removeChat, shareChat } from '@/app/actions'
import { SidebarActions } from '@/components/sidebar-actions'
import { SidebarItem } from '@/components/sidebar-item'
import { Stream } from '@/lib/types';
import { createStorage } from '@/lib/utils';

export interface SidebarListProps {
  userId: string;
}

export async function SidebarList({ }: SidebarListProps) {
  const streams = await getStreams();

  return (
    <div className="flex-1 overflow-auto">
      {streams?.length ? (
        <div className="space-y-2 px-2">
          {streams.map(
            (stream: Stream) => stream.stream_name && (
              <>
                <SidebarItem key={stream.stream_id} stream={stream}>
                  <SidebarActions
                    stream={stream}
                    removeChat={removeChat}
                    shareChat={shareChat}
                  />
                </SidebarItem>
              </>
            )
          )}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No recording history</p>
        </div>
      )}
    </div>
  )
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