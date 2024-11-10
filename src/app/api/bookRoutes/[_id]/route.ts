import connect from "@/app/lib/db/mongoConnection";
import { NextRequest, NextResponse } from "next/server";
import Book from "@/app/lib/models/book";


export async function PUT(req: NextRequest, { params }: { params: { _id: String } }) {
  try {
    await connect();
    const updateData = await req.json();
    console.log(updateData);
    
    if (!params._id) {
      console.log(params._id);
      
      return NextResponse.json(
        { message: "book _id is required" },
        { status: 400 }
      );
    }
    const updateBook = await Book.findOneAndUpdate(
      { _id: params._id }, 
      { ...updateData },
      { new: true, runValidators: true }
    );
    if (!updateBook) {
      return NextResponse.json({ message: "book not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "book updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { message: "Error creating book", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { _id: String } }) {
  try {
    await connect();

    if (!params._id) {
      return NextResponse.json(
        { message: "book _id is required" },
        { status: 400 }
      );
    }
    const deletedBook = await Book.findOneAndDelete({ _id: params._id }); 
    if (!deletedBook) {
      return NextResponse.json({ message: "book not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "book deleted successfully", data: deletedBook },
      { status: 200 }
    );
  } catch (error) {
    console.error("failed deleting book", error);
    return NextResponse.json(
      { message: "error deleting book", error },
      { status: 500 }
    );
  }
}
