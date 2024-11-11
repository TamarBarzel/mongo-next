import connect from "@/app/lib/db/mongoConnection";
import { NextRequest, NextResponse } from "next/server";
import CitySchema from "@/app/lib/models/city";
import City from "@/app/lib/models/city";

export async function GET() {
  try {
    await connect();
    const data = await CitySchema.find();
    console.log("Citys data retrieved successfully", data);
    return NextResponse.json({ message: "successful", data });
  } catch (error: any) {
    console.error("Error fetching cities data:", error);
    return NextResponse.json(
      { message: "Error fetching cars cities", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { name, country } = await req.json();
    if (!name || !country ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const newCity = new City({ name, country});
    await newCity.save();
    return NextResponse.json(
      { message: "city created successfully", data: newCity },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating city:", error);
    return NextResponse.json(
      { message: "Error creating city", error },
      { status: 500 }
    );
  }
}

