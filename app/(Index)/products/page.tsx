import { getAllProducts } from "@/app/_dataAccess";
import ProductCard from "@/components/cards/ProductCard";

const page = async () => {
    const products = await getAllProducts();

    return (
        <>
            <div className="flex flex-wrap">
                {
                    products.map((product: any) => (
                        <ProductCard key={product.id} data={product} />
                    ))
                }
            </div>
        </>
    )
}

export default page