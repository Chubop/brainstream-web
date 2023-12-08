import { createSupabaseServerComponentClient } from "@/app/auth/supabaseAppRouterClient";
import { fetcher } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    // Create a Supabase client for server-side operations
    const supabaseClient = createSupabaseServerComponentClient();
    // Attempt to retrieve the session from Supabase and extract the user ID
    const session = (await supabaseClient.auth.getSession()).data.session;

    const ROUTE = "/chat/query"
    const URL = process.env.PROD_API_URL + ROUTE;

    let requestData = await req.json();
    let userId = session?.user.id ?? requestData?.user_id;
    let streamId = requestData?.stream_id;
    let queryText = requestData?.query_text || '';

    // Use the fetcher function to send a POST request to the production API to process the audio
    const data = await fetcher(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "user_id": userId,
            "stream_id": streamId,
            "query_text": queryText,
        }),
    });

    return NextResponse.json(data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}