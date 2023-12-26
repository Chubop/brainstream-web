'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { kv } from '@vercel/kv';

import { type Chat } from '@/lib/types';
import { createSupabaseServerComponentClient } from './auth/supabaseAppRouterClient';
import { fetcher } from '@/lib/utils';

// New file: app/actions.ts (assuming we are adding to the existing actions.ts)

// ... (existing imports and code)

// Function to create a new stream
export async function createStream(): Promise<any> {
    const ROUTE = '/stream/init';
    const URL = process.env.PROD_API_URL + ROUTE;
    const supabaseClient = createSupabaseServerComponentClient();
    const user = await supabaseClient.auth.getUser();
    // console.log("User:", user);
    const userId = user.data.user?.id;

    console.log('userId from createStream:', userId);
    if (!URL) {
        throw new Error('PROD_API_URL is not set');
    }

    try {
        const response = await fetcher(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: userId }),
        });

        console.log('Response:', response);
        if (response && response.stream_id) {
            return response;
        } else {
            throw new Error('Stream creation failed');
        }
    } catch (error) {
        console.error('Failed to create stream:', error);
        throw error;
    }
}

// Function to get a single stream's details
export async function getStream(requestData: {
    stream_id: string;
}): Promise<any> {
    const ROUTE = 'stream/get/details'; // Updated route
    const URL = process.env.PROD_API_URL + ROUTE;
    const supabaseClient = createSupabaseServerComponentClient();
    const user = await supabaseClient.auth.getUser();
    const userId = user.data.user?.id;

    if (!URL) {
        throw new Error('PROD_API_URL is not set');
    }

    try {
        const response = await fetcher(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...requestData, user_id: userId }),
        });

        return response;
    } catch (error) {
        console.error('actions.ts:74:Failed to get stream:', error);
        throw error;
    }
}

// Function to get a single stream's history
export async function getStreamHistory(requestData: {
    stream_id: string;
}): Promise<any> {
    const ROUTE = '/stream/get/history';
    const URL = process.env.PROD_API_URL + ROUTE;
    const supabaseClient = createSupabaseServerComponentClient();
    const user = await supabaseClient.auth.getUser();
    // console.log("User:", user);
    const userId = user.data.user?.id;
    console.log('user id:', userId);

    if (!URL) {
        throw new Error('PROD_API_URL is not set');
    }

    try {
        const response = await fetcher(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...requestData, user_id: userId }),
        });

        return response;
    } catch (error) {
        console.error('actions.ts:104:Failed to get stream:', error);
        throw error;
    }
}

// Function to get all streams for a user
export async function getStreams(): Promise<any> {
    console.log('Fetching user details for streams...');
    // Fetch the user's details
    const user = await getUserDetails();
    console.log('User details fetched:', user);

    // Fetch the user's streams array
    const streamsArray = user?.streams;
    console.log('User streams array:', streamsArray);

    if (!streamsArray) {
        console.error('No streams found for this user');
        throw new Error('No streams found for this user');
    }

    // Use Promise.all() to fetch details for all streams
    console.log('Fetching details for all streams...');
    const streamsDetails = await Promise.all(
        streamsArray.map((streamId: string) =>
            getStream({ stream_id: streamId })
        )
    );
    console.log('Streams details fetched:', streamsDetails);

    return streamsDetails;
}

// Function to remove a specific stream
export async function removeStream(streamId: string): Promise<any> {
    // Implementation will remove the specified stream
    // You will need to define the logic to remove a stream here
}

// Function to clear all streams for a user
export async function clearStreams(): Promise<any> {
    const supabaseClient = createSupabaseServerComponentClient();
    const userId = (await supabaseClient.auth.getUser()).data.user?.id;
    // Implementation will clear all streams for the given user ID
    // You will need to define the logic to clear all streams here
}

// Function to create a new user
export async function createUser(requestData: {
    first_name: string;
    last_name: string;
    user_id: string;
    email: string;
}): Promise<any> {
    const ROUTE = '/user/init';
    const URL = process.env.PROD_API_URL + ROUTE;

    if (!URL) {
        throw new Error('PROD_API_URL is not set');
    }

    console.log('Firing createUser...');

    return fetcher(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            first_name: requestData.first_name,
            last_name: requestData.last_name,
            user_id: requestData.user_id,
            email: requestData.email,
        }),
    })
        .then((response) => {
            console.log('User creation was successful:', response);
            return response;
        })
        .catch((error) => {
            console.log('User creation failed:', error);
            throw error;
        });
}

// Function to get user details
export async function getUserDetails(): Promise<any> {
    const ROUTE = '/user/get';
    const URL = process.env.PROD_API_URL + ROUTE;
    const supabaseClient = createSupabaseServerComponentClient();
    const userId = (await supabaseClient.auth.getUser()).data.user?.id;

    console.log('\tFetching user details for user ID:', userId);

    if (!URL) {
        throw new Error('PROD_API_URL is not set');
    }

    console.log('\tUser details request URL:', URL);

    return fetcher(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
        }),
    })
        .then((response) => {
            console.log('\tUser details fetched successfully:', response);
            return response;
        })
        .catch((error) => {
            console.log('\tFailed to fetch user details:', error);
            throw error;
        });
}

export async function sendQuery(requestData: {
    streamId: string;
    content: string;
}): Promise<any> {
    const ROUTE = '/stream/query';
    const URL = process.env.PROD_API_URL + ROUTE;

    const userDetails = await getUserDetails();
    const userStreamIds = userDetails.streams;
    const supabaseClient = createSupabaseServerComponentClient();
    const userId = (await supabaseClient.auth.getUser()).data.user?.id;

    if (!URL) {
        throw new Error('PROD_API_URL is not set');
    }

    if (!userStreamIds.includes(requestData.streamId)) {
        throw new Error('Unauthorized.');
    }

    return fetcher(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            stream_id: requestData.streamId,
            user_id: userId,
            query_text: requestData.content,
        }),
    });
}

///////////
// OLD
///////////
export async function getChats(userId?: string | null) {
    if (!userId) {
        return [];
    }

    try {
        const pipeline = kv.pipeline();
        const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
            rev: true,
        });

        for (const chat of chats) {
            pipeline.hgetall(chat);
        }

        const results = await pipeline.exec();

        return results as Chat[];
    } catch (error) {
        return [];
    }
}

export async function getChat(id: string, userId: string) {
    const chat = await kv.hgetall<Chat>(`chat:${id}`);

    if (!chat || (userId && chat.userId !== userId)) {
        return null;
    }

    return chat;
}

export async function removeChat({ id, path }: { id: string; path: string }) {
    const supabaseClient = createSupabaseServerComponentClient();
    const session = (await supabaseClient.auth.getSession()).data.session;

    if (!session) {
        return {
            error: 'Unauthorized',
        };
    }

    const uid = await kv.hget<string>(`chat:${id}`, 'userId');

    if (uid !== session?.user?.id) {
        return {
            error: 'Unauthorized',
        };
    }

    await kv.del(`chat:${id}`);
    await kv.zrem(`user:chat:${session.user.id}`, `chat:${id}`);

    revalidatePath('/');
    return revalidatePath(path);
}

export async function clearChats() {
    const supabaseClient = createSupabaseServerComponentClient();
    const session = (await supabaseClient.auth.getSession()).data.session;

    if (!session?.user?.id) {
        return {
            error: 'Unauthorized',
        };
    }

    const chats: string[] = await kv.zrange(
        `user:chat:${session.user.id}`,
        0,
        -1
    );
    if (!chats.length) {
        return redirect('/');
    }
    const pipeline = kv.pipeline();

    for (const chat of chats) {
        pipeline.del(chat);
        pipeline.zrem(`user:chat:${session.user.id}`, chat);
    }

    await pipeline.exec();

    revalidatePath('/');
    return redirect('/');
}

export async function getSharedChat(id: string) {
    const chat = await kv.hgetall<Chat>(`chat:${id}`);

    if (!chat || !chat.sharePath) {
        return null;
    }

    return chat;
}

export async function shareChat(chat: Chat) {
    const supabaseClient = createSupabaseServerComponentClient();
    const session = (await supabaseClient.auth.getSession()).data.session;

    if (!session?.user?.id || session.user.id !== chat.userId) {
        return {
            error: 'Unauthorized',
        };
    }

    const payload = {
        ...chat,
        sharePath: `/share/${chat.id}`,
    };

    await kv.hmset(`chat:${chat.id}`, payload);

    return payload;
}
