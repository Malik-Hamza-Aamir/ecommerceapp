import { NextResponse } from "next/server";
import { db } from "@/app/db";

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
  } catch (error) {
    console.log("Error in get single store api :", error);
    return NextResponse.json(
      { message: "Can't update address Try Again!" },
      { status: 500 }
    );
  }
}
