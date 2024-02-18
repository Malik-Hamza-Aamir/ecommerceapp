"use client";
import { useState } from "react";
import { CartContext } from "@/app/_context/CartContext";

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<any>([]);
    return (
        <CartContext.Provider value={{ products, setProducts }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;