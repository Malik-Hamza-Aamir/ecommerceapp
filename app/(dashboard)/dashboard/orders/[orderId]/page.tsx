import { getAllOrderedProducts } from "@/app/_dataAccess"

const OrderedProducts = async ({ params: { orderId } }: { params: { orderId: string } }) => {
    const products = await getAllOrderedProducts(orderId);

    return (
        <div>
            {
                products.map((product) => (
                    <div key={product.id}>
                        <p>{product.id}</p>
                        <p>{product.name}</p>
                        <p>{product.quantity}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default OrderedProducts