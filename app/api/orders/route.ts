import { NextResponse } from "next/server";
import { db } from "@/app/db";

export async function GET(request: Request) {
  try {
  } catch (error) {
    console.log("Error in get orders api :", error);
    return NextResponse.json(
      { message: "Can't get orders Try Again!" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { userId, orderStatus, totalPrice } = await request.json();
  } catch (error) {
    console.log("Error in post orders api :", error);
    return NextResponse.json(
      { message: "Can't post orders Try Again!" },
      { status: 500 }
    );
  }
}
