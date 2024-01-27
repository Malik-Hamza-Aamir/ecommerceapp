import ProductCard from "@/components/ProductCard";

const page = async () => {
    const response = await fetch("http://localhost:3000/api/products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    const data = await response.json();
    const products = data.products;
    console.log("products are :", data.products);

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