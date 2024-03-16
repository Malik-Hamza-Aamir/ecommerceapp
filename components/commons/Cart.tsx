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
import CartProductCard from "../cards/CartProductCard";
import { useProductsContext } from "@/hooks/useProductsContext";
import { useTotalBill } from "@/hooks/useTotalBill";
import { ProductsContext, ProductOrder } from "@/common/type";
import { useToast } from "../ui/use-toast";

interface Props {
    userId: string;
}

const Cart = ({ userId }: Props) => {
    const { products, setProducts } = useProductsContext();
    const totalBill = useTotalBill();
    const { toast } = useToast();

    const handleClearCartClick = () => {
        setProducts([]);
    }

    const handleCheckoutClick = async () => {
        const productForOrder: ProductOrder[] = products.map((products: ProductsContext) => {
            return {
                productId: products.id,
                quantity: products.noOfItems
            }
        })

        if (totalBill) {
            console.log("bill :", totalBill);
            // const orderGenerated = await generateOrderAction(userId, totalBill, productForOrder);

            // if (orderGenerated?.message) {
            //     toast({
            //         title: orderGenerated.message,
            //         description: "Your order has been generated"
            //     })

            //     setProducts([]);
            // } else if (orderGenerated?.error) {
            //     toast({
            //         variant: "destructive",
            //         title: orderGenerated.error,
            //         description: "Something went wrong during creating your order"
            //     })
            // }
        }
    }

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
                    {products.map((product: ProductsContext) => (
                        <CartProductCard key={product.id} product={product} setProducts={setProducts} />
                    ))}

                    {products.length > 0 ? <h5>Total : <strong>{totalBill !== null ? totalBill : 0}</strong></h5> : null}
                    <SheetFooter>
                        {
                            products.length > 0 ? (
                                <Button onClick={handleClearCartClick}>Clear Cart</Button>
                            ) : null
                        }

                        <hr />

                        <SheetClose asChild>
                            <Button onClick={handleCheckoutClick}>Checkout</Button>
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