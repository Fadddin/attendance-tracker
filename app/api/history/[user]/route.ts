// app/api/history/[user]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connect from '@/app/lib/mongoose';
import History from '@/app/model/history';

export async function GET(req: NextRequest, { params }: { params: { user: string } }) {
    const { user } = params;

    await connect();

    try {
        const history = await History.find({ user }).sort({ date: -1 });
        return NextResponse.json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }
}
