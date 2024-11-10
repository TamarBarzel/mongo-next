import connect from "@/app/lib/db/mongoConnection";
import { NextRequest, NextResponse } from "next/server";
import Car from "@/app/lib/models/car";


export async function PUT(req: NextRequest, { params }: { params: { _id: String } }) {
  try {
    await connect();
    const updateData = await req.json();
    console.log(updateData);
    
    if (!params._id) {
      console.log(params._id);
      
      return NextResponse.json(
        { message: "car _id is required" },
        { status: 400 }
      );
    }
    const updateCar = await Car.findOneAndUpdate(
      { _id: params._id }, 
      { ...updateData },
      { new: true, runValidators: true }
    );
    if (!updateCar) {
      return NextResponse.json({ message: "car not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "car updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { message: "Error creating car", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { _id: String } }) {
  try {
    await connect();

    if (!params._id) {
      return NextResponse.json(
        { message: "car _id is required" },
        { status: 400 }
      );
    }
    const deletedCar = await Car.findOneAndDelete({ _id: params._id }); // שיניתי כאן ל-{ _id: params._id }
    if (!deletedCar) {
      return NextResponse.json({ message: "car not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "car deleted successfully", data: deletedCar },
      { status: 200 }
    );
  } catch (error) {
    console.error("failed deleting car", error);
    return NextResponse.json(
      { message: "error deleting car", error },
      { status: 500 }
    );
  }
}
