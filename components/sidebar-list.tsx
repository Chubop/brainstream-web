import { getChats, getStream, getUserDetails, removeChat, shareChat } from '@/app/actions'
import { SidebarActions } from '@/components/sidebar-actions'
import { SidebarItem } from '@/components/sidebar-item'
import { Stream } from '@/lib/types';
import { createStorage } from '@/lib/utils';

export interface SidebarListProps {
  userId?: string
}

export async function SidebarList({ userId }: SidebarListProps) {

  const userDetails = await getUserDetails();
  const streamIds = (userDetails.streams || []) as string[];
  const streamObjects: Stream[] = [];

  console.log("Streams:", streamIds);
  await Promise.all(streamIds.map(async (streamId) => {
    let stream = await getStream({stream_id: streamId});
    streamObjects.push(stream);
  }));
  console.log("Stream Objects:", streamObjects);

  return (
    <div className="flex-1 overflow-auto">
      {streams?.length ? (
        <div className="space-y-2 px-2">
          {streams.map((stream: Stream) => (
            <div key={stream.stream_id} style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{stream.stream_id}</div>          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-sm text-muted-foreground">No recording history</p>
        </div>
      )}
    </div>
  )

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

}
