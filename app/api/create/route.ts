import { NextRequest, NextResponse } from 'next/server'
import connect from "@/app/lib/mongoose";
import User from "@/app/model/User";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = params.id

//   await connect();

//     const users = await User.find({ user : id});
//     return NextResponse.json(users);
// }

export async function POST(req: NextRequest) {
    await connect();

    try {
        const { name, user, subjects } = await req.json();

        // Validate the input
        if (!name || !user || !subjects) {
            return NextResponse.json({ error: 'Name, user, and subjects are required' }, { status: 400 });
        }

        // Create a new user document
        const newUser = new User({ name, user, subjects });

        // Save the user document to the database
        await newUser.save();

        return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}