import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getCookie, setCookie } from "cookies-next";

/**
 * This function creates a Supabase server client with cookie handling.
 * @param {boolean} serverComponent - A flag to indicate if the client is for a server component.
 * @returns {object} The created Supabase server client.
 */
export function createSupabaseAppServerClient(serverComponent = false){

    return createServerClient(
        // The Supabase URL from the environment variables.
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        // The Supabase anonymous key from the environment variables.
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        {
            cookies: {
                // Function to get a cookie by name.
                get(name){
                    return cookies().get(name)?.value
                },
                // Function to set a cookie.
                set(name, value, options){
                    cookies().set(name, value, options);
                },
                // Function to remove a cookie by name.
                remove(name, options){
                    // If it's a server component, do not remove the cookie.
                    if ( serverComponent ) return;
                    cookies().set(name, "", options);
                }

            }
        }
    )
}

/**
 * This function creates a Supabase server client specifically for server components.
 * @returns {object} The created Supabase server client.
 */
export function createSupabaseServerComponentClient() {
    return createSupabaseAppServerClient(true);
}