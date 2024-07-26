import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/mongoose";
import User from "@/app/model/User";

export async function GET(req: NextRequest, res: NextResponse) {

    // await connect();

    // const users = await User.find({});
    return NextResponse.json({Msg : "hey"});
}

export async function POST(req: NextRequest, res: NextResponse) {

    await connect();

    const {name , user , subjects } = await req.json();
    const newUser = new User({ name , user , subjects});
    await newUser.save();
    return NextResponse.json(newUser)
}

export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        await connect();

        const { name, user, subjects } = await req.json();
        
        if (!name || !user || !subjects) {
            return NextResponse.json({ msg: "Missing required fields" }, { status: 400 });
        }

        const updatedUser = await User.findOneAndUpdate(
            { user },
            { name, user, subjects },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ msg: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ msg: "User Updated", user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
    }
}