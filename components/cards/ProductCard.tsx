"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useProductsContext } from "@/hooks/useProductsContext";
import { Products, ProductsContext } from "@/common/type";


const ProductCard = ({ data, productId }: { data: Products, productId: string }) => {
    const { setProducts } = useProductsContext();
    const [imgSrc, setImgSrc] = useState<string | null>(null);

    const checkProductExists = (prev: ProductsContext[], prodId: string) => {
        let exists = false;
        prev.map((data: ProductsContext) => {
            if (data.id === prodId) {
                exists = true;
            }
        })

        return exists;
    }

    const handleClick = () => {
        const { id, name, description, price } = data;
        const product = {
            id: id,
            name: name,
            description: description,
            price: price,
            image: imgSrc,
            noOfItems: 1,
        }

        setProducts((prev: ProductsContext[]) => {
            const exists = checkProductExists(prev, product.id);

            if (exists) {
                const updatedProducts = prev.map((item: any) => {
                    if (item.id === product.id) {
                        return {
                            ...item,
                            noOfItems: item.noOfItems + 1
                        };
                    }
                    return item;
                });
                return updatedProducts;

            } else {
                return [...prev, product];
            }
        })
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