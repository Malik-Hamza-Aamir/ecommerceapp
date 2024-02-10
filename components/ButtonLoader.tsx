"use client";

import { Button } from "./ui/button";

interface Props {
    children: React.ReactNode
}

const ButtonLoader = ({ children }: Props) => {
    return (
        <Button type="submit" className="w-[7rem] mt-3">{children}</Button>
    )
}

export default ButtonLoader