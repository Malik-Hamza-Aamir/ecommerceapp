"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react";
import { signIn } from "next-auth/react";

const page = () => {
  const [inputText, setInputText] = useState<{ email: string, password: string }>({
    email: "",
    password: "",
  });
  const [username, setUsername] = useState<string>("");

  const handleEmailChange = (e: any) => {
    const value: string = e.target.value;
    setInputText({ ...inputText, email: value });
  }

  const handlePasswordChange = (e: any) => {
    const value: string = e.target.value;
    setInputText({ ...inputText, password: value });
  }

  const handleSignIn = () => {
    signIn("credentials", inputText, { callbackUrl: "/" })
  }

  const handleRegisterUser = async () => {
    const payload = {
      email: inputText.email,
      password: inputText.password,
      username: username
    }
    const result = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    console.log(result);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Tabs defaultValue="signin" className="w-[400px]">

        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Signin</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
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
                <Input id="email" type="text" value={inputText.email} placeholder="Email Here..." onChange={(e) => handleEmailChange(e)} />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={inputText.password} placeholder="Password Here..." onChange={(e) => handlePasswordChange(e)} />
              </div>

            </CardContent>
            <CardFooter>
              <Button onClick={handleSignIn} >Sign in</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="register">
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
                <Input id="email" type="text" value={inputText.email} placeholder="Email Here..." onChange={(e) => handleEmailChange(e)} />
              </div>

              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" value={username} placeholder="Username Here..." onChange={(e) => setUsername(e.target.value)} />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={inputText.password} placeholder="Password Here..." onChange={(e) => handlePasswordChange(e)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRegisterUser}>Register</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default page;