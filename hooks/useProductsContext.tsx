"use client";
import { useContext } from "react";
import { CartContext } from "@/app/_context/CartContext";

export const useProductsContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useProductsContext must be used within a ProductsProvider');
    }
    return context;
};