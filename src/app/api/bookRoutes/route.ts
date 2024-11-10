import connect from "@/app/lib/db/mongoConnection";
import { NextRequest, NextResponse } from "next/server";
import BookSchema from "@/app/lib/models/book";
import Book from "@/app/lib/models/book";

export async function GET() {
  try {
    await connect();
    const data = await BookSchema.find();
    console.log("Books data retrieved successfully", data);
    return NextResponse.json({ message: "successful", data });
  } catch (error: any) {
    console.error("Error fetching books data:", error);
    return NextResponse.json(
      { message: "Error fetching cars books", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { name, author, publishYear } = await req.json();
    if (!name || !author || !publishYear) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const newBook = new Book({ name, author, publishYear});
    await newBook.save();
    return NextResponse.json(
      { message: "book created successfully", data: newBook },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.id) {
      return NextResponse.json(
        { message: "id already exists. Please use a different id." },
        { status: 409 }  
      );
    }

    console.error("Error creating book:", error);
    return NextResponse.json(
      { message: "Error creating book", error },
      { status: 500 }
    );
  }
}

