'use server';

import { getSupabaseUserId } from '@/lib/server-utils';
import { makePostRequest, validateRequestParams } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const requestData = await req.json();
    const userId = await getSupabaseUserId(requestData);

    validateRequestParams(requestData, [
        'first_name',
        'last_name',
        'user_id',
        'email',
    ]);

    const ROUTE = '/user/init';
    const URL = process.env.PROD_API_URL + ROUTE;
    if (!URL) {
        throw new Error('PROD_API_URL is not set');
    }

    const data = await makePostRequest(URL, {
        first_name: requestData.first_name,
        last_name: requestData.last_name,
        user_id: userId,
        email: requestData.email,
    });

    return NextResponse.json(data);
}
