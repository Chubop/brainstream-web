import { sendQuery } from '@/app/actions';

export async function append(
    data: { streamId: string; content: string; role: string },
    setMessages: React.Dispatch<React.SetStateAction<any[]>>
) {
    if (data.role === 'user') {
        // Add an optimistic loading message for the assistant
        setMessages(prevMessages => [
            ...prevMessages,
            { content: '', role: 'assistant', isLoading: true },
        ]);

        // Send the query to the server and wait for the response
        const response = await sendQuery({
            streamId: data.streamId,
            content: data.content,
        });

        // Update the messages with the server's response
        setMessages(prevMessages => {
            const newMessages = [...prevMessages];
            // Find the last assistant message that is loading
            const lastLoadingIndex = newMessages.findIndex(
                (message, index) => 
                    message.role === 'assistant' && 
                    message.isLoading && 
                    index === newMessages.length - 1
            );

            // If found, update it with the response
            if (lastLoadingIndex !== -1) {
                newMessages[lastLoadingIndex] = {
                    content: response.response_text,
                    role: 'assistant',
                    isLoading: false,
                };
            }

            return newMessages;
        });
    }
}