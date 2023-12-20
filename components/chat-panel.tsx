
import { Button } from "@/components/ui/button";
import { PromptForm } from "@/components/prompt-form";
import { ButtonScrollToBottom } from "@/components/button-scroll-to-bottom";
import { IconRefresh, IconStop } from "@/components/ui/icons";
import { FooterText } from "@/components/footer";
import { append } from "@/lib/chat";
import { Message } from "@/lib/types";
import { usePathname, useRouter } from 'next/navigation';
import { createStream } from "@/app/actions";
import toast from "react-hot-toast";

export interface ChatPanelProps {
  id: string;
  isLoading: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<any>>;
}


export function ChatPanel({
  id,
  isLoading,
  input,
  setInput,
  messages,
  setMessages
}: ChatPanelProps) {

  const router = useRouter();
  const pathname = usePathname();

  async function handleStreamCreation() {
    // if creating the stream on the homepage
    if (pathname === '/') {
      try {
        const data = await createStream();
        if (data && data.stream_id) {
          toast.success(`Stream ${data.stream_id} created`);
          return data.stream_id
        } else {
          throw new Error('Failed to create stream');
        }
      } catch (error) {
        toast.error('Failed to create stream');
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    await handleStreamCreation();
  }

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async (value) => {
              setMessages([...messages, {"content": value, "role": "user"}])
              if (pathname === '/') {
                const streamId = await handleStreamCreation();
                console.log("new stream id:", streamId);
                router.push(`/stream/${streamId}`);
                await append({
                  streamId: streamId, // streamId instead of path' ID
                  content: value,
                  role: "user",
                }, setMessages);
              } else {
                await append({
                  streamId: id, // path ID
                  content: value,
                  role: "user",
                }, setMessages);
              }
            }}
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
