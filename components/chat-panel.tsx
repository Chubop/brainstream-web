import { useRouter } from 'next/navigation';
import { useCreateStream } from '@/lib/hooks/use-create-stream';
import { append } from '@/lib/chat';
import { Message } from '@/lib/types';
import { PromptForm } from '@/components/prompt-form';
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom';
import { FooterText } from '@/components/footer';
import toast from 'react-hot-toast';
import { useOptimisticMessage } from '@/lib/hooks/use-optimistic-message';

export interface ChatPanelProps {
    id: string;
    isLoading: boolean;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function ChatPanel({
    id,
    isLoading,
    input,
    setInput,
    setMessages,
}: ChatPanelProps) {
    const router = useRouter();
    const { createStreamOnly } = useCreateStream();
    const addOptimisticMessage = useOptimisticMessage(setMessages);

    async function handleSubmit(value: string) {
        addOptimisticMessage(value);
        let streamId = id;
        if (!streamId) {
            streamId = await createStreamOnly();
            if (streamId) {
                router.push(`/stream/${streamId}`);
            }
        }

        await append(
            {
                streamId,
                content: value,
                role: 'user',
            },
            setMessages
        );
    }

    return (
        <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
            <ButtonScrollToBottom />
            <div className="mx-auto sm:max-w-2xl sm:px-4">
                <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
                    <PromptForm
                        onSubmit={handleSubmit}
                        input={input}
                        setInput={setInput}
                        isLoading={isLoading}
                    />
                    <FooterText className="hidden sm:block" />
                </div>
            </div>
        </div>
    );
}
