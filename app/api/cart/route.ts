import { NextResponse } from "next/server";
import { db } from "@/app/db";

export async function POST(request: Request) {
    try {
        
    } catch (error) {
        console.log("error in creating new Product :", error);
        return NextResponse.json({ message: "Unable to Create Product. Please Try Again!" });
    }
}