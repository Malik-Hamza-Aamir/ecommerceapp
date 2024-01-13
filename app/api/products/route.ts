import { NextResponse } from "next/server";
import { db } from "@/app/db";

export async function GET(request: Request) {
    try {
        const products = await db.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                quantity: true,
                sizes: true,
                colors: true,
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
        const { name, description, price, quantity, storeId, categoryId, sizes = undefined, colors = undefined } = await request.json();
        
        if (!name || !price || !description || !quantity || !storeId || !categoryId) {
            return NextResponse.json({ message: "Please Enter Required Data" }, { status: 400 });
        }

        const productExists = await db.product.findUnique({
            where: {
                name
            }
        })

        if (productExists) {
            return NextResponse.json({ message: "Product Already Exists" }, { status: 400 });
        }

        await db.product.create({
            data: {
                name,
                description,
                price,
                quantity,
                storeId,
                categoryId,
                sizes,
                colors
            }
        })

        return NextResponse.json({ message: "Product Added Successfully" }, { status: 200 });
    }
    catch (error) {
        console.log("error in creating new Product :", error);
        return NextResponse.json({ message: "Unable to Create Product. Please Try Again!" });
    }
}