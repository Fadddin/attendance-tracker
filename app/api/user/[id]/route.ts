import { NextRequest, NextResponse } from 'next/server'
import connect from "@/app/lib/mongoose";
import User from "@/app/model/User";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  await connect();

    const users = await User.find({ user : id});
    return NextResponse.json(users);
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}