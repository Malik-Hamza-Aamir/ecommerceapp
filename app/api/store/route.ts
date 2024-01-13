import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export const POST = async (request: Request) => {
  const session = await getServerSession(options);
  const uId = session?.user?.id as string;

  try {
    const { name, description } = await request.json();

    if (!name || !description) {
      return NextResponse.json(
        { message: "Please Enter Required Data" },
        { status: 400 }
      );
    }

    const userExists = await db.user.findUnique({
      where: {
        id: uId,
      },
    });

    if (!userExists) {
      return NextResponse.json(
        { message: "Please Enter Required Data" },
        { status: 400 }
      );
    }

    const storeExists = await db.store.findUnique({
      where: {
        name,
      },
    });

    if (storeExists) {
      return NextResponse.json(
        { message: "Store Already Exists by this Name" },
        { status: 400 }
      );
    }

    await db.store.create({
      data: {
        name,
        description,
        userId: uId,
      },
    });

    return NextResponse.json(
      { message: "Store Created Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in post store api :", error);
    return NextResponse.json(
      { message: "Can't Create Store" },
      { status: 500 }
    );
  }
};

export const PUT = async (request: Request) => {
  try {
    const { id, name, description } = await request.json();

    if (!name || !description || !id) {
      return NextResponse.json(
        { message: "Please Enter Required Data" },
        { status: 400 }
      );
    }

    const storeExists = await db.store.findUnique({
      where: {
        name,
      },
    });

    if (storeExists) {
      return NextResponse.json(
        { message: "Store Already Exists by this Name" },
        { status: 400 }
      );
    }

    await db.store.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(
      { message: "Store Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in Put store api :", error);
    return NextResponse.json(
      { message: "Can't Update Store" },
      { status: 500 }
    );
  }
};
