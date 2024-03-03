"use client";
import { useState } from "react";
import { CartContext } from "@/app/_context/CartContext";
import { ProductsContext } from "@/common/type";

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<ProductsContext[]>([]);
    console.log("products inside the context :", products);

    return (
        <CartContext.Provider value={{ products, setProducts }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;