"use client";
import { createContext } from "react";
import { ProductContextType } from "@/common/type";

export const CartContext = createContext<ProductContextType | undefined>(
  undefined
);
