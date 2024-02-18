"use client";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from 'lucide-react';
import { Button } from "../ui/button";
import { useContext } from "react";
import { CartContext } from "@/app/_context/CartContext";
import CartProductCard from "../cards/CartProductCard";

const Cart = () => {
    const { products } = useContext(CartContext);

    return (
        <div className="relative">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="mx-2 px-2"><ShoppingCart size={18} /></Button>
                </SheetTrigger>

                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Cart</SheetTitle>
                    </SheetHeader>
                    {products.map((product: any) => (
                        <CartProductCard />
                    ))}
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button>Checkout</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>

            </Sheet>

            {
                products.length > 0 ? <span className="text-[12px] absolute top-0 right-3 font-semibold">{products.length}</span> : null
            }
        </div>
    )
}

export default Cart