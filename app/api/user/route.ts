import { NextResponse } from "next/server";
import { db } from "@/app/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Please Enter Required Data" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        username: true,
        email: true,
        phone: true,
        address: true,
      },
    });

    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error) {
    console.log("error in user get api :", error);
    return NextResponse.json({ message: "Can't get user Data" });
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Please Enter Required Data" },
        { status: 400 }
      );
    }

    const body: any = await request.json();

    if (!body) {
      return NextResponse.json(
        { message: "Please Enter Required Data" },
        { status: 400 }
      );
    }

    const updatedFields: any = {};
    for (const key in body) {
      updatedFields[key] = body[key];
    }

    await db.user.update({
      where: {
        id,
      },
      data: updatedFields,
    });

    return NextResponse.json({ message: "Updated Successfully" }, { status: 200 })
  } catch (error) {
    console.log("error in user patch api :", error);
    return NextResponse.json({ message: "Can't update user Data" });
  }
}
