"use client";
import { useContext } from "react";
import { CartContext } from "@/app/_context/CartContext";

const CartProductCard = () => {
    const { products, setProducts } = useContext(CartContext);
    return (
        <div>CartProductCard</div>
    )
}

export default CartProductCard