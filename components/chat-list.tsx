import { Separator } from '@/components/ui/separator';
import { ChatMessage } from '@/components/chat-message';
import { Message } from '@/lib/types';

export interface ChatList {
    messages: Message[];
}

export function ChatList({ messages }: ChatList) {
    if (!messages.length) {
        return null;
    }

    return (
        <div className="relative mx-auto max-w-2xl px-4">
            {messages.map((message, index) => {
                return (
                    <>
                        <ChatMessage key={message.content} message={message} />
                        {index < messages.length - 1 && (
                            <Separator
                                key={message.content}
                                className="my-4 md:my-8"
                            />
                        )}
                    </>
                );
            })}
        </div>
    );
}
