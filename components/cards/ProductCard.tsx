"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useContext } from "react";
import { CartContext } from "@/app/_context/CartContext";

const ProductCard = ({ data }: { data: any }) => {
    const { setProducts } = useContext(CartContext);
    const handleClick = () => {
        setProducts((prev: any) => [...prev, data])
    }

    return (
        <div className="border-2 w-[30%]">
            <Image src="/dummyImage.jpg" alt="product image" width={45} height={45} />
            <h4>{data.name}</h4>
            <h4>$ {data.price}</h4>
            <Button size="sm" onClick={handleClick}>Add to cart</Button>
        </div>
    )
}

export default ProductCard;