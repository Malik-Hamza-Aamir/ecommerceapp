import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function GET(request: Request) {
    try {
        const products = await db.product.findMany({
            select: {
                name: true,
                price: true,
                description: true
            }
        })

        return NextResponse.json({products: products}, { status: 200 })
    } catch (error) {
        console.log("error in Getting Products :", error);
        return NextResponse.json({ message: "Can't get Products" });
    }
}

export async function POST(request: Request) {    
    try{
        const { name, price, description } = await request.json();
        
        if (!name || !price || !description) {
            return NextResponse.json({ message: "Please Enter Required Data" }, { status: 400 });
        }

        await db.product.create({
            data: {
                name,
                price,
                description
            }
        })

        return NextResponse.json({ message: "Product Added Successfully" }, { status: 200 });
    }
    catch (error) {
        console.log("error in creating new Product :", error);
        return NextResponse.json({ message: "Unable to Create Product. Please Try Again!" });
    }
}