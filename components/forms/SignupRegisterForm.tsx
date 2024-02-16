"use client";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
    type: string;
}

const SignupRegisterForm = ({ type }: Props) => {
    const [inputText, setInputText] = useState<{ email: string, password: string, username: string }>({
        email: "",
        password: "",
        username: "",
    })
    const router = useRouter();

    const handleSignIn = () => {
        const payload = {
            email: inputText.email,
            password: inputText.password
        }
        console.log("handleSignin method called");
        signIn("credentials", payload, { callbackUrl: "/" });
    }

    const handleSubmit = () => {
        console.log("handle submit clicked");
        if (type === "register") {
            console.log("type is register");
            handleRegisterUser();
        } else if (type === "signin") {
            console.log("type is signin");
            handleSignIn();
        }
    }

    const handleRegisterUser = async () => {
        const result = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputText),
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Choose a method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex items-center">
                    <Button className="w-full mr-2" onClick={() => signIn("google", { callbackUrl: "/" })}>Google</Button>
                    <Button className="w-full ml-2" onClick={() => signIn("github", { callbackUrl: "/" })}>Github</Button>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="text" value={inputText.email} placeholder="Email Here..." onChange={(e) => setInputText({ ...inputText, email: e.target.value })} />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={inputText.password} placeholder="Password Here..." onChange={(e) => setInputText({ ...inputText, password: e.target.value })} />
                </div>

                {
                    type === "register" ? (
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" type="text" value={inputText.username} placeholder="Username Here..." onChange={(e) => setInputText({ ...inputText, username: e.target.value })} />
                        </div>
                    ) : null
                }

            </CardContent>
            <CardFooter>
                <Button onClick={() => handleSubmit} >{type === "signin" ? "Sign in" : "Register"}</Button>
            </CardFooter>
        </Card>
    )
}

export default SignupRegisterForm