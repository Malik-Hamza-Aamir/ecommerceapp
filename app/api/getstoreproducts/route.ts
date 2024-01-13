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

    const storeProducts = await db.store.findUnique({
      where: {
        id,
      },
      select: {
        products: true,
      },
    });

    return NextResponse.json({ stores: storeProducts }, { status: 200 });
  } catch (error) {
    console.log("error in getting store Products :", error);
    return NextResponse.json({
      message: "Unable to Get Product. Please Try Again!",
    });
  }
}
