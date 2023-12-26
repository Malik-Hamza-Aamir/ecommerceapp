import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/app/db";
import { hash } from "bcrypt";

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();
        let uniqueId = uuidv4();
        let idExists = true;

        if (!username || !email || !password) {
            return NextResponse.json({ message: "Please Enter Required User Data" }, { status: 400 });
        }

        const user = await db.user.findUnique({
            where: {
                email
            }
        })

        if (user) {
            return NextResponse.json({ message: "User Already Exists" }, { status: 400 })
        }

        while (idExists) {
            const existingUser = await db.user.findUnique({
                where: {
                    id: uniqueId,
                },
            });

            idExists = existingUser !== null;

            if (idExists) {
                uniqueId = uuidv4();
            }
        }

        const hashedPassword = await hash(password, 10);
        await db.user.create({
            data: {
                id: uniqueId,
                username,
                email,
                password: hashedPassword,
            }
        });

        return NextResponse.json({ message: "Please Signin to Continue" }, { status: 200 })

    } catch (error) {
        console.log("error in Registering User :", error);
        return NextResponse.json({ message: "User Registration Failed" });
    }
}