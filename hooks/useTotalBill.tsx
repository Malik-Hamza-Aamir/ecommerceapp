"use client";
import { useEffect, useState } from "react";
import { useProductsContext } from "./useProductsContext";
import { ProductsContext } from "@/common/type";

export const useTotalBill = (): number | null => {
    const { products } = useProductsContext();
    const [totalBill, setTotalBill] = useState<number | null>(null);

    useEffect(() => {
        if (products && products.length > 0) {
            const bill: number = products
                .map((product: ProductsContext) => product.noOfItems * product.price)
                .reduce((prev: number, curr: number) => prev + curr, 0);
            setTotalBill(bill);
        } else {
            setTotalBill(0);
        }
    }, [products]);

    return totalBill;
};
