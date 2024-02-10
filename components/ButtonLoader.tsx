"use client";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react"

interface Props {
    text: string;
}

const ButtonLoader = ({ text }: Props) => {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="sm" className="w-[7rem] mt-3 text-white" disabled={pending ? true : false}>
            {
                pending ? <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {text}
                </div> : text
            }
        </Button>
    )
}

export default ButtonLoader