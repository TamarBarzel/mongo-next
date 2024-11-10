import connect from "@/app/lib/db/mongoConnection";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/lib/models/user";


export async function PUT(req: NextRequest,{ params }: { params:{email: String}}) {
  try {
    await connect();
    const updateData = await req.json();
    if (!params.email) {
      return NextResponse.json(
        { message: "user email is required" },
        { status: 400 }
      );
    }
    const updateUser = await User.findOneAndUpdate(
      { email:params.email },
      { ...updateData },
      { new: true, runValidators: true }
    );
    if (!updateUser) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    return NextResponse.json(
      { mesage: "user updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest,{ params }: { params:{email: String}}
) {
  try {
    await connect();
    const { email } = params;

    if (!email) {
      return NextResponse.json(
        { message: "User email is required" },
        { status: 400 }
      );
    }
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User deleted successfully", data: deletedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("failed deleting user", error);
    return NextResponse.json(
      { message: "error deleting user", error },
      { status: 500 }
    );
  }
}
