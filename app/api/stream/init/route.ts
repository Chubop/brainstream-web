"use server";

import { createSupabaseServerComponentClient } from "@/app/auth/supabaseAppRouterClient";
import { fetcher } from "@/lib/utils";
import { NextResponse, NextRequest } from "next/server";


/**
 * Handles the POST request to create a new stream with the user's ID.
 * 
 * @param {NextRequest} req - The incoming request object.
 * @returns {NextResponse} - The response object with the initialization data or an error message.
 */
export async function POST(req: NextRequest) {

  const supabaseClient = createSupabaseServerComponentClient();

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
  const response = await fetcher(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "user_id": userId }),
  });

  // Parse the response data as JSON and return it
  const data = await response.json();
  return NextResponse.json(data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}