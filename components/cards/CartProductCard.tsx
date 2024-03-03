"use client";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { ProductsContext } from "@/common/type";
import { Dispatch, SetStateAction } from "react";

interface Props {
    product: ProductsContext;
    setProducts: Dispatch<SetStateAction<ProductsContext[]>>;
}

const CartProductCard = ({ product, setProducts }: Props) => {

    const handleDeleteIconClick = (productId: string) => {
        setProducts((prev: ProductsContext[]) => {
            const updatedProducts = prev.filter((item: ProductsContext) => item.id !== productId);
            return updatedProducts;
        });
    }

    const handleNoOfItemsChange = (e: any, productId: string) => {
        const value: number = Number(e.target.value);

        if (value === 0) {
            handleDeleteIconClick(productId);
        } else {
            setProducts((prev: ProductsContext[]) => {
                const updatedProducts = prev.map((item: ProductsContext) => {
                    if (item.id === productId) {
                        return {
                            ...item,
                            noOfItems: Number(value)
                        };
                    }
                    return item;
                });
                return updatedProducts;
            });
        }
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

            <input type="number" value={product.noOfItems} onChange={(e) => handleNoOfItemsChange(e, product.id)} className="w-[10%] border-2 border-black rounded-sm" />

            <div className="mr-2 flex items-center">
                <Trash2 onClick={() => handleDeleteIconClick(product.id)} size={20} className="text-red-600 hover:text-red-500 cursor-pointer" />
            </div>
        </div>
    )
}

export default CartProductCard