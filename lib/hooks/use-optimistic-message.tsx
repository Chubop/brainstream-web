import { Dispatch, SetStateAction } from 'react';
import { Message } from '@/lib/types';

export const useOptimisticMessage = (
    setMessages: Dispatch<SetStateAction<Message[]>>
) => {
    const addOptimisticMessage = (value: string) => {
        setMessages((prevMessages: Message[]) => [
            ...prevMessages,
            {
                content: value,
                role: 'user',
                isLoading: false,
                additional_kwargs: [],
            },
        ]);
    };

    return addOptimisticMessage;
};
