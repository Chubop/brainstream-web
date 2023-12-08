// app/api/stream/init/route.ts
"use server";

import { getSupabaseUserId } from "@/lib/supabase-utils";
import { makePostRequest } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles the POST request to create a new stream with the user's ID.
 * 
 * @param {NextRequest} req - The incoming request object.
 * @returns {NextResponse} - The response object with the initialization data or an error message.
 */
export async function POST(req: NextRequest) {
    const requestData = await req.json();
    let userId = await getSupabaseUserId(requestData);

    const ROUTE = "/stream/init";
    const URL = process.env.PROD_API_URL + ROUTE;
    if (!URL) {
        throw new Error('PROD_API_URL is not set');
    }

    // If no user ID is found, return an Unauthorized response
    if (!userId) {
        return new NextResponse("Unauthorized", {
            status: 401,
        });
    }

    // Send a POST request to the production API to initialize the stream
    const data = await makePostRequest(URL, { "user_id": userId });

    // Return the response data as JSON
    return NextResponse.json(data);
}