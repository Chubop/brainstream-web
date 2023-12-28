import { sendQuery } from '@/app/actions';

export async function append(
    data: { streamId: string; content: string; role: string },
    setMessages: React.Dispatch<React.SetStateAction<any[]>>
) {
    let newMessages: any[] = [];

    if (data.role === 'user') {
        setMessages((prevMessages) => {
            if (
                prevMessages.length === 0 ||
                !prevMessages[prevMessages.length - 1].isLoading
            ) {
                newMessages = [
                    ...prevMessages,
                    { content: '', role: 'assistant', isLoading: true },
                ];
            } else {
                newMessages = [...prevMessages];
            }
            return newMessages;
        });
        const response = await sendQuery({
            streamId: data.streamId,
            content: data.content,
        });
        setMessages((prevMessages) => {
            newMessages = [...prevMessages];
            // Check if newMessages array is not empty before assigning value to avoid -1 index
            if (newMessages.length > 2) {
                newMessages[newMessages.length - 1] = {
                    content: response.response_text,
                    role: 'assistant',
                    isLoading: false,
                };
            }
            return newMessages;
        });
    }
    return newMessages;
}
