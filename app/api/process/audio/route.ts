import { createSupabaseServerComponentClient } from "@/app/auth/supabaseAppRouterClient";
import { fetcher } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){

    // Create a Supabase client for server-side operations
    const supabaseClient = createSupabaseServerComponentClient();
    // Attempt to retrieve the session from Supabase and extract the user ID
    const session = (await supabaseClient.auth.getSession()).data.session;

    const ROUTE = "/process/audio"
    const URL = process.env.PROD_API_URL + ROUTE;

    let requestData = await req.json();
    let userId = session?.user.id ?? requestData?.user_id;
    let streamId = requestData?.stream_id;
    let audioName = requestData?.audio_name;
    let audioFileBlobName = requestData?.audio_file_blob_name;
    let transcriptionMethod = requestData?.transcription_method || 'DG'; // default is 'DG' 
    let category = requestData?.category;

    // Use the fetcher function to send a POST request to the production API to process the audio
    const data = await fetcher(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "user_id": userId,
            "stream_id": streamId,
            "audio_name": audioName,
            "audio_file_blob_name": audioFileBlobName,
            "transcription_method": transcriptionMethod,
            "category": category
        }),
    });

    return NextResponse.json(data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    // expected return is { "audio_id": UUID, "message": "Audio processed and document created successfully." }
    
}