import { getCategories } from "@/app/_dataAccess";
import { AddProductCarousel } from "@/components/commons/AddProductCarousel";
import AddProductForm from "@/components/forms/AddProductForm";

const page = async ({ params: { id } }: { params: { id: string } }) => {
    const categories = await getCategories();

    return (
        <div className="pt-[32px] mr-[10%] flex-1">
            <h2 className="text-3xl">
                <strong>Add Product</strong>
            </h2>
            <p className="text-gray-500">Add Products to this Store</p>

            <div className="p-8 border-2 rounded-[20px] mt-4">
                <h2 className="text-3xl">
                    <strong>Add Product</strong>
                </h2>
                <p className="text-gray-500">Add Products to this Store</p>
                <AddProductCarousel />
                <AddProductForm categories={categories} id={id} />
            </div>
        </div>
    )
}

export default page