import { NextResponse } from "next/server";
import { db } from "@/app/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "Please Enter Required Data" },
        { status: 400 }
      );
    }

    const address = await db.address.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json({ address: address }, { status: 200 });
  } catch (error) {
    console.log("Error in get address api :", error);
    return NextResponse.json(
      { message: "Can't get address Try Again!" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { street, city, stateProvince, country, zip, userId } =
      await request.json();
    if (!street || !city || !stateProvince || !country || !zip || !userId) {
      return NextResponse.json(
        { message: "Please Enter Required Data" },
        { status: 400 }
      );
    }

    await db.address.create({
      data: {
        street,
        city,
        stateProvince,
        country,
        zip,
        userId,
      },
    });

    return NextResponse.json(
      { message: "Address Added Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in post address api :", error);
    return NextResponse.json(
      { message: "Can't update address Try Again!" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { message: "Please Enter Required Data" },
        { status: 400 }
      );
    }

    await db.address.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "Address Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in delete address api :", error);
    return NextResponse.json(
      { message: "Can't delete address Try Again!" },
      { status: 500 }
    );
  }
}
