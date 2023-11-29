import { NextResponse, type NextRequest } from 'next/server'
import { createSupabaseReqResClient } from './app/auth/supabaseReqResClient'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createSupabaseReqResClient(request, response);
  
  return response;
}