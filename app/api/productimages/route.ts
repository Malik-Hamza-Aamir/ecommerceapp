import { NextResponse } from "next/server";
import { db } from "@/app/db";

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { message: "Please provide the required data" },
        { status: 400 }
      );
    }

    const productImages = await db.productImage.findFirst({
      where: {
        AND: [{ imageType: "PRIMARY" }, { productId }],
      },
      select: {
        url: true,
      },
    });

    return NextResponse.json({ productImages }, { status: 200 });
  } catch (error) {
    console.log("Error in get product images api :", error);
    return NextResponse.json(
      { message: "Can't get product images" },
      { status: 500 }
    );
  }
}
