"use client";

// Importing necessary modules and components
import { useChat, type Message } from "ai/react";
import { cn } from "@/lib/utils";
import { ChatList } from "@/components/chat-list";
import { ChatPanel } from "@/components/chat-panel";
import { EmptyScreen } from "@/components/empty-screen";
import { ChatScrollAnchor } from "@/components/chat-scroll-anchor";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "react-hot-toast";
import { Stream } from "@/lib/types";

// Checking if the environment is preview
const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

// Defining the props for the Chat component
export interface ChatProps extends React.ComponentProps<"div"> {
  stream?: Stream;
}

// Defining the Chat component
export function Chat({ stream }: ChatProps) {

  const [messages, setMessages] = useState(stream?.chat_history || []);
  const streamId = stream?.stream_id || "";
  const [input, setInput] = useState("");

  return (
    <>
      <div className={cn("pb-[200px] pt-4 md:pt-10")}>
        {messages?.length ? (
          <>
            {/* Rendering the chat list if there are messages */}
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={false} />
          </>
        ) : (
          // Rendering the empty screen if there are no messages
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      {/* // Rendering the chat panel */}
      <ChatPanel
        id={streamId}
        isLoading={false}
        input={input}
        setInput={setInput}
        messages={messages}
        setMessages={setMessages}
      />
    </>
  );
}
