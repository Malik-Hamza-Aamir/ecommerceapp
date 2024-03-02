import { getAllProducts } from "@/app/_dataAccess";
import ProductCard from "@/components/cards/ProductCard";
import { Products } from "@/common/type";

const page = async () => {
    const products = await getAllProducts();

    return (
        <>
            <div className="flex flex-wrap justify-evenly">
                {
                    products.map((product: Products) => (
                        <ProductCard
                            key={product.id}
                            data={product}
                            productId={product.id}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default page