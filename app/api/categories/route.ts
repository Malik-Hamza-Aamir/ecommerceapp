import { NextResponse } from "next/server";
import { db } from "@/app/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryName = searchParams.get("categoryName");

    if (!categoryName) {
      return NextResponse.json(
        { message: "Plesae Enter Required Data" },
        { status: 400 }
      );
    }

    const products = await db.category.findUnique({
      where: {
        title: categoryName,
      },
    });

    return NextResponse.json({ category: products }, { status: 200 });
  } catch (error) {
    console.log("Error in categories api :", error);
    return NextResponse.json(
      { message: "Can't get data for this category" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { message: "For Category Creation a title is needed" },
        { status: 400 }
      );
    }

    const categoryExists = await db.category.findUnique({
      where: {
        title
      }
    })

    if (categoryExists) {
      return NextResponse.json({ message: "Category Already Exists" }, { status: 400 })
    }

    await db.category.create({
      data: {
        title,
      },
    });

    return NextResponse.json(
      { message: "Category Created Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in post categories api :", error);
    return NextResponse.json(
      { message: "Can't create category" },
      { status: 500 }
    );
  }
}
