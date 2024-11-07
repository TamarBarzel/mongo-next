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
      const { email, firstName, lastName, password} = await req.json();
      if (!email || !firstName || !lastName ||!password) {
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
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { message: "Error creating user", error },
        { status: 500 }
      );
    }
  }

  export async function PUT(req: NextRequest) {
    try {
      await connect();
      const {email,...updateData}= await req.json();
      if(!email){
        return NextResponse.json({message:'user email is required'},{status:400})
      }
      const updateUser=await User.findOneAndUpdate(
        {email},
        {...updateData},
        {new: true, runValidators:true}
      );
      if(!updateUser){
        return NextResponse.json({message:'user not found'},{status:404})
      }

      return NextResponse.json({mesage:'user updated successfully'},{status:200})
  
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json(
        { message: "Error creating user", error },
        { status: 500 }
      );
    }
  }

  
  export async function DELETE(req:NextRequest) {
    try{
      await connect();
      const {email}=await req.json();

      if (!email){
        return NextResponse.json({ message: "User email is required" }, { status: 400 })
      }
      const deletedUser= await User.findOneAndDelete({email})
      if(!deletedUser){
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }
      return NextResponse.json({ message: "User deleted successfully", data: deletedUser },
        { status: 200})

    }catch(error){
      console.error('failed deleting user',error);
      return NextResponse.json({message:'error deleting user',error},{status:500})
      
    }
    
  }
  
  