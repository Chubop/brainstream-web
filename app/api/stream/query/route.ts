import { getSupabaseUserId } from "@/lib/supabase-utils";
import { makePostRequest, validateRequestParams } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const requestData = await req.json();
    const userId = await getSupabaseUserId(requestData);

    validateRequestParams(requestData, ['stream_id', 'query_text']);

    const ROUTE = "/stream/query";
    const URL = process.env.PROD_API_URL + ROUTE;
    if (!URL) {
        throw new Error('PROD_API_URL is not set');
    }

    const data = await makePostRequest(URL, {
        "user_id": userId,
        "stream_id": requestData.stream_id,
        "query_text": requestData.query_text,
    });

    return NextResponse.json(data);
}