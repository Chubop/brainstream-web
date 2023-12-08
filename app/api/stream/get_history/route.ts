"use server";

import { createSupabaseServerComponentClient } from "@/app/auth/supabaseAppRouterClient";
import { fetcher } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    // Create a Supabase client for server-side operations
    const supabaseClient = createSupabaseServerComponentClient();
    // Attempt to retrieve the session from Supabase and extract the user ID
    const session = (await supabaseClient.auth.getSession()).data.session;

    const ROUTE = "/stream/get_history"
    const URL = process.env.PROD_API_URL + ROUTE;
    console.log("URL:", URL);

    let requestData = await req.json();
    let userId = session?.user.id ?? requestData?.user_id;
    let streamId = requestData?.stream_id; 

    // If no user ID is found, return an Unauthorized response
    if (!userId || !streamId) {
        return new NextResponse("Missing request body parameter (expecting user_id and stream_id)", {
            status: 401,
        });
    }

    // Use the fetcher function to send a POST request to the production API to initialize the stream
    const data = await fetcher(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_id": userId, "stream_id": streamId }),
    });
    

    return NextResponse.json(data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

}