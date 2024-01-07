import { NextResponse } from "next/server";
import { db } from "@/app/db";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: "Please Enter Required Data" },
        { status: 400 }
      );
    }

    const stores = await db.store.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return NextResponse.json({ stores: stores }, { status: 200 });
  } catch (error) {
    console.log("Error in get single store api :", error);
    return NextResponse.json(
      { message: "Can't get Store Try Again!" },
      { status: 500 }
    );
  }
}
