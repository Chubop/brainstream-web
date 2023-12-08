"use server";

import { createSupabaseAppServerClient, createSupabaseServerComponentClient } from "@/app/auth/supabaseAppRouterClient";
import { NextRequest } from "next/server";

export async function getSupabaseUserId(requestData: Promise<any>) {
    const supabaseClient = createSupabaseAppServerClient();
    const session = (await supabaseClient.auth.getSession()).data.session;
    const data = await requestData;
    return session?.user.id ?? data?.user_id;
}