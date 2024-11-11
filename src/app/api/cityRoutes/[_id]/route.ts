import connect from "@/app/lib/db/mongoConnection";
import { NextRequest, NextResponse } from "next/server";
import City from "@/app/lib/models/city";


export async function PUT(req: NextRequest, { params }: { params: { _id: String } }) {
  try {
    await connect();
    const updateData = await req.json();
    console.log(updateData);
    
    if (!params._id) {
      console.log(params._id);
      
      return NextResponse.json(
        { message: "city _id is required" },
        { status: 400 }
      );
    }
    const updateCity = await City.findOneAndUpdate(
      { _id: params._id }, 
      { ...updateData },
      { new: true, runValidators: true }
    );
    if (!updateCity) {
      return NextResponse.json({ message: "city not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "city updated successfully" },
      { status: 200 }
    );
  } catch (error:any) {
    console.error("Error updating city:", error);
    return NextResponse.json(
      { message: "Error creating city", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { _id: String } }) {
  try {
    await connect();

    if (!params._id) {
      return NextResponse.json(
        { message: "city _id is required" },
        { status: 400 }
      );
    }
    const deletedCity = await City.findOneAndDelete({ _id: params._id });
    if (!deletedCity) {
      return NextResponse.json({ message: "city not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "city deleted successfully", data: deletedCity },
      { status: 200 }
    );
  } catch (error) {
    console.error("failed deleting city", error);
    return NextResponse.json(
      { message: "error deleting city", error },
      { status: 500 }
    );
  }
}
