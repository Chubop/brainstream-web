"use server";

import { createSupabaseServerComponentClient } from "@/app/auth/supabaseAppRouterClient";
import { NextResponse, NextRequest } from "next/server";
import fetch from 'node-fetch';


/**
 * Handles the POST request to create a new stream with the user's ID.
 * 
 * @param {NextRequest} req - The incoming request object.
 * @returns {NextResponse} - The response object with the initialization data or an error message.
 */
export async function POST(req: NextRequest) {

  // Create a Supabase client for server-side operations
  const supabaseClient = createSupabaseServerComponentClient();
  // Attempt to retrieve the session from Supabase and extract the user ID
  const session = (await supabaseClient.auth.getSession()).data.session;
  let userId = session?.user.id ?? (await req.json())?.user_id;

  const ROUTE = "/stream/init"
  const URL = process.env.PROD_API_URL + ROUTE;
  
  // If no user ID is found, return an Unauthorized response
  if (!userId) {
    return new NextResponse("Unauthorized", {
      status: 401,
    });
  }

  // Send a POST request to the production API to initialize the stream
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "user_id": userId }),
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