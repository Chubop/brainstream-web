"use server";

import { createSupabaseAppServerClient } from "@/app/auth/supabaseAppRouterClient";

export async function getSupabaseUserId(requestData: Promise<any>) {
    const supabaseClient = createSupabaseAppServerClient();
    const session = (await supabaseClient.auth.getSession()).data.session;
    const data = await requestData;
    return session?.user.id ?? data?.user_id;
}