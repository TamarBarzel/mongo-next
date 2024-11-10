import connect from "@/app/lib/db/mongoConnection";
import { NextRequest, NextResponse } from "next/server";
import UserSchema from "@/app/lib/models/user";
import User from "@/app/lib/models/user";

export async function GET() {
  try {
    await connect();
    const data = await UserSchema.find();
    console.log("hello", data);
    return NextResponse.json({ message: "successful", data });
  } catch (error) {
    return NextResponse.json("error in fetching data user" + error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { email, firstName, lastName, password } = await req.json();
    if (!email || !firstName || !lastName || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const newUser = new User({ email, firstName, lastName, password });
    await newUser.save();
    return NextResponse.json(
      { message: "user created successfully", data: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return NextResponse.json(
        { message: "Email already exists. Please use a different email." },
        { status: 409 }  // סטטוס 409 לציון Conflict
      );
    }

    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}

