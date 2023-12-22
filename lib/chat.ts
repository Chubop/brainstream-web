import { sendQuery } from "@/app/actions";
import { usePathname } from 'next/navigation';

export async function append(data: {streamId: string, content: string, role: string}, setMessages: React.Dispatch<React.SetStateAction<any[]>>){
    let newMessages: any[] = [];

    if(data.role === "user"){
        console.log("Appending user message...");
        setMessages(prevMessages => {
            if (prevMessages.length === 0 || !prevMessages[prevMessages.length - 1].isLoading) {
                newMessages = [...prevMessages, {"content": "", "role": "assistant", "isLoading": true}];
            } else {
                newMessages = [...prevMessages];
            }
            return newMessages;
        });
        console.log("Set messages in handleSubmit()");
        const response = await sendQuery({streamId: data.streamId, content: data.content})
        console.log("Received response from sendQuery: ", response);
        setMessages(prevMessages => {
            newMessages = [...prevMessages];
            // Check if newMessages array is not empty before assigning value to avoid -1 index
            if (newMessages.length > 2) {
                newMessages[newMessages.length - 1] = {"content": response.response_text, "role": "assistant", "isLoading": false};
            }
            console.log("Updated messages with assistant response: ", newMessages);
            return newMessages;
        });
        console.log("Set messages in chat.ts");
    }
    return newMessages;
}