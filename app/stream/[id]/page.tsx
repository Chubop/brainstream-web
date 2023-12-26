import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

// import { auth } from "@/auth";
import { getStream } from '@/app/actions'; // Assuming you have a similar function for Stream
import { createSupabaseServerComponentClient } from '@/app/auth/supabaseAppRouterClient';
import { Chat } from '@/components/chat';

export const runtime = 'edge';
export const preferredRegion = 'home';

export interface StreamPageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({
    params,
}: StreamPageProps): Promise<Metadata> {
    const supabaseClient = createSupabaseServerComponentClient();
    const session = (await supabaseClient.auth.getSession()).data.session;

    if (!session?.user) {
        return {};
    }

    const stream = await getStream({ stream_id: params.id });
    return {
        title: stream?.stream_name.toString().slice(0, 50) ?? 'Stream',
    };
}

export default async function StreamPage({ params }: StreamPageProps) {
    const supabaseClient = createSupabaseServerComponentClient();
    const session = (await supabaseClient.auth.getSession()).data.session;

    if (!session?.user) {
        redirect(`/sign-in?next=/stream/${params.id}`);
    }

    const stream = await getStream({ stream_id: params.id }); // Use getStream instead of getChat
    if (!stream) {
        console.log('Stream not found');
        notFound();
    }

    return <Chat stream={stream} />; // Use Stream component and stream_id instead of id
}
