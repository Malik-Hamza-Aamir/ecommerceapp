import { getCategories, getProduct } from "@/app/_dataAccess";
import { Product } from "@/common/type";
import UpdateProductForm from "@/components/forms/UpdateProductForm";

const page = async ({ params: { id, prodid } }: { params: { id: string, prodid: string } }) => {
    const categories = await getCategories();
    const product = await getProduct(prodid) as Product;

    return (
        <div className="pt-[32px] mr-[10%] flex-1">
            <h2 className="text-3xl">
                <strong>Update Product</strong>
            </h2>
            <p className="text-gray-500">Update this product</p>

            <div className="p-8 border-2 rounded-[20px] mt-4">
                <h2 className="text-3xl">
                    <strong>Update Product</strong>
                </h2>
                <p className="text-gray-500">Update this product</p>

                <UpdateProductForm categories={categories} id={id} prodId={prodid} product={product} />
            </div>
        </div>
    )
}

export default page