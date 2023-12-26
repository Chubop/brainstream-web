'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createStream } from '@/app/actions';
import toast from 'react-hot-toast';

/**
 * Custom hook to handle stream creation and navigation.
 */
export function useCreateStream() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    /**
     * Creates a new stream without navigating the user.
     * @returns {Promise<string | undefined>} The ID of the created stream or undefined if creation fails.
     */
    const createStreamOnly = async () => {
        setIsLoading(true);
        try {
            const data = await createStream();
            if (data?.stream_id) {
                // toast.success(`Stream ${data.stream_id} created`);
                return data.stream_id;
            }
        } catch (error) {
            toast.error('Failed to create stream');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Creates a new stream and navigates the user to it.
     */
    const createAndNavigate = async () => {
        const streamId = await createStreamOnly();
        if (streamId) {
            router.push(`/stream/${streamId}`);
        }
    };

    return { createStreamOnly, createAndNavigate, isLoading };
}
