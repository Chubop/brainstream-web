'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

import { type Chat } from '@/lib/types'
import { createSupabaseServerComponentClient } from './auth/supabaseAppRouterClient'
import { fetcher } from '@/lib/utils'


// New file: app/actions.ts (assuming we are adding to the existing actions.ts)

// ... (existing imports and code)

// Function to create a new stream
export async function createStream(): Promise<any> {
  console.log("Entered createStream function...");
  const ROUTE = '/stream/init';
  const URL = process.env.PROD_API_URL + ROUTE;
  console.log("URL:", URL);
  const supabaseClient = createSupabaseServerComponentClient();
  const user = await supabaseClient.auth.getUser();
  // console.log("User:", user);
  const userId = user.data.user?.id;
  
  console.log("userId from createStream:", userId);
  if (!URL) {
    throw new Error('PROD_API_URL is not set');
  }

  try {
    console.log("About to fetch from URL...");
    const response = await fetcher(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "user_id": userId }),
    });

    console.log("Response:", response);
    if (response && response.stream_id) {
      return response;
    } else {
      throw new Error('Stream creation failed');
    }
  } catch (error) {
    console.error("Failed to create stream:", error);
    throw error;
  }
}

// Function to get a single stream's history
export async function getStream(requestData: { stream_id: string }): Promise<any> {
  console.log("Entered getStream function...");
  const ROUTE = '/stream/get_history';
  const URL = process.env.PROD_API_URL + ROUTE;
  console.log("URL:", URL);
  const supabaseClient = createSupabaseServerComponentClient();
  const user = await supabaseClient.auth.getUser();
  // console.log("User:", user);
  const userId = user.data.user?.id;
  
  console.log("userId from getStream:", userId);
  console.log("streamId from body:", requestData.stream_id);
  if (!URL) {
    throw new Error('PROD_API_URL is not set');
  }

  try {
    console.log("About to fetch from URL...");
    const response = await fetcher(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...requestData, "user_id": userId}),
    });

    console.log("Response:", response);
    return response;
  } catch (error) {
    console.error("Failed to get stream:", error);
    throw error;
  }
}

// Function to get all streams for a user
export async function getStreams(): Promise<any> {
  const supabaseClient = createSupabaseServerComponentClient();
  const userId = (await supabaseClient.auth.getUser()).data.user?.id;
  // Implementation will fetch all streams for the given user ID
  // You will need to define the logic to retrieve all streams here
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
export async function createUser(requestData: { first_name: string, last_name: string, user_id: string, email: string }): Promise<any> {
  const ROUTE = '/user/init';
  const URL = process.env.PROD_API_URL + ROUTE;
  
  if (!URL) {
    throw new Error('PROD_API_URL is not set');
  }

  console.log("Firing createUser...")

  return fetcher(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "first_name": requestData.first_name,
      "last_name": requestData.last_name,
      "user_id": requestData.user_id,
      "email": requestData.email
    }),
  }).then(response => {
    console.log('User creation was successful:', response);
    return response;
  }).catch(error => {
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
  
  if (!URL) {
    throw new Error('PROD_API_URL is not set');
  }

  return fetcher(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "user_id": userId,
    }),
  });
}


///////////
// OLD
///////////
export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    const pipeline = kv.pipeline()
    const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
      rev: true
    })

    for (const chat of chats) {
      pipeline.hgetall(chat)
    }

    const results = await pipeline.exec()

    return results as Chat[]
  } catch (error) {
    return []
  }
}

export async function getChat(id: string, userId: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || (userId && chat.userId !== userId)) {
    return null
  }

  return chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const supabaseClient = createSupabaseServerComponentClient();
  const session = (await supabaseClient.auth.getSession()).data.session

  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  const uid = await kv.hget<string>(`chat:${id}`, 'userId')

  if (uid !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  await kv.del(`chat:${id}`)
  await kv.zrem(`user:chat:${session.user.id}`, `chat:${id}`)

  revalidatePath('/')
  return revalidatePath(path)
}

export async function clearChats() {
  const supabaseClient = createSupabaseServerComponentClient();
  const session = (await supabaseClient.auth.getSession()).data.session

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  const chats: string[] = await kv.zrange(`user:chat:${session.user.id}`, 0, -1)
  if (!chats.length) {
  return redirect('/')
  }
  const pipeline = kv.pipeline()

  for (const chat of chats) {
    pipeline.del(chat)
    pipeline.zrem(`user:chat:${session.user.id}`, chat)
  }

  await pipeline.exec()

  revalidatePath('/')
  return redirect('/')
}

export async function getSharedChat(id: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || !chat.sharePath) {
    return null
  }

  return chat
}

export async function shareChat(chat: Chat) {
  const supabaseClient = createSupabaseServerComponentClient();
  const session = (await supabaseClient.auth.getSession()).data.session
  
  if (!session?.user?.id || session.user.id !== chat.userId) {
    return {
      error: 'Unauthorized'
    }
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  await kv.hmset(`chat:${chat.id}`, payload)

  return payload
}
