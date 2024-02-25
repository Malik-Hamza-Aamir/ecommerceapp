"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { CartContext } from "@/app/_context/CartContext";
import { useEffect, useState, useContext } from "react";

const ProductCard = ({ data, productId }: { data: any, productId: string }) => {
    const { setProducts } = useContext(CartContext);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const handleClick = () => {
        const { id, name, description, price } = data;
        const product = {
            id: id,
            name: name,
            description: description,
            price: price,
            image: imgSrc,
        }
        setProducts((prev: any) => [...prev, product])
    }

    const getProductImages = async () => {
        const result = await fetch("http://localhost:3000/api/productimages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: productId
            }),
        })

        if (result.ok) {
            const images = await result.json();
            if (images.productImages !== null) {
                setImgSrc(images.productImages.url);
            } else if (images.productImages === null) {
                setImgSrc(images.productImages);
            }
        }
    }

    useEffect(() => {
        getProductImages();
    }, [])

    return (
        <div className="w-[30%]">

            <Image
                src={imgSrc !== "" && imgSrc !== null ? imgSrc : "/dummyImage.jpg"}
                alt="product image"
                height={100}
                width={100}
            />
            <h4>{data.name}</h4>
            <h4>$ {data.price}</h4>
            <Button size="sm" onClick={handleClick}>Add to cart</Button>
        </div>
    )
}

export default ProductCard;