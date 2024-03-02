"use client";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useProductsContext } from "@/hooks/useProductsContext";

interface Props {
    product: any;
}

const CartProductCard = ({ product }: Props) => {
    const { products, setProducts } = useProductsContext();

    const handleDeleteIconClick = (productId: string) => {

    }

    return (
        <div className="my-2 flex justify-between border-2 items-center">

            <div className="truncate border-2 w-[20%] h-full">
                <Image src={product.image} alt="product image" width={32} height={32} className="" />
            </div>

            <div>
                <h5>{product.name}</h5>
                <p>${product.price}</p>
            </div>

            <input type="number" value={product.noOfItems} className="w-[10%] border-2 border-black rounded-sm" />

            <div className="mr-2 flex items-center">
                <Trash2 onClick={() => handleDeleteIconClick(product.id)} size={20} className="text-red-600 hover:text-red-500 cursor-pointer" />
            </div>
        </div>
    )
}

export default CartProductCard