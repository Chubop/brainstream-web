"use server";

import { createSupabaseServerComponentClient } from "@/app/auth/supabaseAppRouterClient";
import { NextRequest, NextResponse } from "next/server";
import fetch from 'node-fetch';


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

    // Send a POST request to the production API to initialize the stream
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            { "user_id": userId,
              "stream_id": streamId }
        ),
    });

    // If the response from the production API is not OK, log and return the error
    if (!response.ok) {
        console.error("Error contacting the production API. Status:", response.status, "Status Text:", response.statusText);
        let errorBody;
        try {
            // Attempt to read the error body from the response
            const errorBody = await response.text();
            console.error("Error Body:", errorBody);
        } catch (error) {
            // Log any error that occurs while parsing the error response
            console.error("Error parsing the error response:", error);
        }
        // Return a JSON response with the error details
        return NextResponse.json("Error contacting the production API", {
            status: response.status,
            statusText: errorBody,
        });
    }
    // Parse the response data as JSON and return it
    const data = await response.json();
    return NextResponse.json(data, {
        headers: {
        'Content-Type': 'application/json',
        },
    });
}