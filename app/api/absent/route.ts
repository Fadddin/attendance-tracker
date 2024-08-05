import { NextRequest, NextResponse } from 'next/server'
import connect from "@/app/lib/mongoose";
import User from "@/app/model/User";
import History from '@/app/model/history';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const id = params.id

//   await connect();

//     const users = await User.find({ user : id});
//     return NextResponse.json(users);
// }


export async function PUT(req: NextRequest) {
    await connect();

    try {
        const { user, subjectName } = await req.json();

        // Validate the input
        if (!user || !subjectName) {
            return NextResponse.json({ error: 'User email and subjectName are required' }, { status: 400 });
        }

        // Find the user by email and update the specific subject
        const userDoc = await User.findOne({ user });
        if (!userDoc) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const subject = userDoc.subjects.find((subject) => subject.name === subjectName);
        if (!subject) {
            return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
        }

        // Increment attended and total by 1
        // subject.attended += 1;
        subject.total += 1;

        await userDoc.save();

        const addTime = (hours: number, minutes: number): string => {
            const now = new Date();
            now.setHours(now.getHours() + hours);
            now.setMinutes(now.getMinutes() + minutes);
            return now.toLocaleTimeString();
        };

        const newTime = addTime(5, 30);

        const newHistory = new History({
            user,
            subjectName,
            date: new Date(),
            time: newTime,
            status: 'absent'
        });
        await newHistory.save();

        return NextResponse.json({ message: 'Subject updated successfully', user: userDoc }, { status: 200 });
    } catch (error) {
        console.error('Error updating subject:', error);
        return NextResponse.json({ error: 'Failed to update subject' }, { status: 500 });
    }
}


export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}