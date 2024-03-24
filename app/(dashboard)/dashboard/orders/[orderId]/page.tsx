import { getProductQuantity } from "@/app/_dataAccess"
import { MyOrderedProducts } from "@/common/type";

const OrderedProducts = async ({ params: { orderId } }: { params: { orderId: string } }) => {
    const products = await getProductQuantity(orderId);

    return (
        <div className="pt-[32px] pr-[10%] flex-1 flex flex-col max-h-[90vh] overflow-y-auto">
            {
                products.map((product: MyOrderedProducts) => (
                    <div key={product.id} className="border-2 mb-2">
                        <p>{product.productName}</p>
                        <p>{product.quantity}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default OrderedProducts