import connect from "@/app/lib/db/mongoConnection";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/lib/models/user";


export async function POST(req: NextRequest) {
  try {
    await connect();
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing email or password" },
        { status: 400 }
      );
    }
    const user= await User.findOne({email})

    if(!user){
      return NextResponse.json(
        { message: "User not registered. Please sign up first." },
        { status: 404 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", data: user },
      { status: 200 }
    );
  }
   catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { message: "Error logging in:", error },
      { status: 500 }
    );
  }
}

