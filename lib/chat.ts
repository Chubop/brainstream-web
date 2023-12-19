import { sendQuery } from "@/app/actions";


export async function append(data: {streamId: string, content: string, role: string}, setMessages: React.Dispatch<React.SetStateAction<any[]>>){
    if(data.role === "user"){
        const response = await sendQuery({streamId: data.streamId, content: data.content})
        // Append the new message to the existing messages
        setMessages(prevMessages => [...prevMessages, {"content": response.response_text, "role": "assistant"}]);
    }
}