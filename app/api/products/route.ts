import { NextResponse } from "next/server";
import { db } from "@/app/db";

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
        const { name, price, description, quantity } = await request.json();
        
        if (!name || !price || !description) {
            return NextResponse.json({ message: "Please Enter Required Data" }, { status: 400 });
        }

// model Product {
//   id                String           @id @default(cuid())
//   name              String
//   price             Int
//   description       String
//   quantity          Int
//   store             Store            @relation(fields: [storeId], references: [id])
//   storeId           String
//   Cart              Cart?            @relation(fields: [cartId], references: [id])
//   cartId            String?
//   PurchaseHistory   PurchaseHistory? @relation(fields: [purchaseHistoryId], references: [id])
//   purchaseHistoryId String?
//   Order             Order[]
//   Categories        Categories?      @relation(fields: [categoriesId], references: [id])
//   categoriesId      String?
// }

        await db.product.create({
            data: {
                name,
                price,
                description,
                quantity,
                
            }
        })

        return NextResponse.json({ message: "Product Added Successfully" }, { status: 200 });
    }
    catch (error) {
        console.log("error in creating new Product :", error);
        return NextResponse.json({ message: "Unable to Create Product. Please Try Again!" });
    }
}