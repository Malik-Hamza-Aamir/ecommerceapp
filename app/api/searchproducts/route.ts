import { NextResponse } from "next/server";
import { db } from "@/app/db";

export async function POST(request: Request) {
    try {
        const { char } = await request.json();

        if (!char) {
            return NextResponse.json({ message: "Please Enter Required Data" }, { status: 400 });
        }

        const products = await db.product.findMany({
            select: {
                name: true,
            },
            where: {
                name: {
                    startsWith: char
                }
            }
        })

        return NextResponse.json({ products: products }, {status: 200});
    } catch (error) {
        console.log("error in Search Product api :", error);
        return NextResponse.json({ message: "Searching Product Failed" });
    }
}