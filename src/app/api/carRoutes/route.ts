import connect from "@/app/lib/db/mongoConnection";
import { NextRequest, NextResponse } from "next/server";
import CarSchema from "@/app/lib/models/car";
import User from "@/app/lib/models/car";

export async function GET() {
  try {
    await connect();
    const data = await CarSchema.find();
    console.log("Cars data retrieved successfully", data);
    return NextResponse.json({ message: "successful", data });
  } catch (error: any) {
    console.error("Error fetching cars data:", error);
    return NextResponse.json(
      { message: "Error fetching cars data", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { id, company, model, year } = await req.json();
    if (!id || !company || !model || !year) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const newCar = new User({ id, company, model, year });
    await newCar.save();
    return NextResponse.json(
      { message: "car created successfully", data: newCar },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.id) {
      return NextResponse.json(
        { message: "id already exists. Please use a different id." },
        { status: 409 }  
      );
    }

    console.error("Error creating car:", error);
    return NextResponse.json(
      { message: "Error creating car", error },
      { status: 500 }
    );
  }
}

