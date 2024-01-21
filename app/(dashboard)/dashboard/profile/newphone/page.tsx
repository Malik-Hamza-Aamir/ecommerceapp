"use client";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react"

const page = () => {
    const { data: session } = useSession()
    const [phoneNo, setPhoneNo] = useState<string>("");
    const [isloading, setIsLoading] = useState(false);
    const { toast } = useToast()

    const handleSubmit = async () => {
        const id = session?.user?.id as string;
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/user?id=${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone: phoneNo
                })
            })

            setPhoneNo("");

            toast({
                title: "Phone Number Updated Successfully!",
                description: "Phone Number has been updated.",
            });
        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    const getPhoneNumber = async () => {
        const id = session?.user?.id as string;
        const response = await fetch(`http://localhost:3000/api/phone?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.ok) {
            const jsonResponse = await response.json();
            const phoneNumber = jsonResponse?.user?.phone;
            if (phoneNumber !== null) {
                setPhoneNo(phoneNumber);
            } else {
                setPhoneNo("");
            }
        }
    }

    useEffect(() => {
        getPhoneNumber();
    }, [])

    return (
        <div className="pt-[32px] mr-[20rem] w-full">
            <h2 className="text-3xl">
                <strong>Update Phone</strong>
            </h2>
            <p className="text-gray-500">Link a phone number to your account</p>

            <div className="p-8 border-2 rounded-[20px] mt-4">
                <h2 className="text-3xl">
                    <strong>Update Phone</strong>
                </h2>
                <p className="text-gray-500">Link a phone number to your account</p>

                <form onSubmit={handleSubmit} className="flex flex-col mt-4 w-[90%]">
                    <label htmlFor="phone">Phone Number</label>
                    <input value={phoneNo} type="text" name="phone" onChange={(e) => setPhoneNo(e.target.value)} placeholder="Type Phone Number here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />

                    <Button type="submit" size="sm" className="w-[7rem] mt-3" disabled={isloading ? true : false}>
                        {
                            isloading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null
                        }
                        Update
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default page