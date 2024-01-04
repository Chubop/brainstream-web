'use server';

import { getSupabaseUserId } from '@/lib/server-utils';
import { makePostRequest, validateRequestParams } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const requestData = await req.json();
    const userId = await getSupabaseUserId(requestData);

    validateRequestParams(requestData, ['user_id']);

    const ROUTE = '/user/get';
    const URL = process.env.PROD_API_URL + ROUTE;
    if (!URL) {
        throw new Error('PROD_API_URL is not set');
    }

    const data = await makePostRequest(URL, {
        user_id: userId,
    });

    return NextResponse.json(data);
}
