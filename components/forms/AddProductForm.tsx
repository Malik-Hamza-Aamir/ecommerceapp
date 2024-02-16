"use client";
import { Category } from "@/common/type";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ButtonLoader from "../buttons/ButtonLoader";
import { useToast } from "../ui/use-toast";
import { addProductAction } from "@/app/_actions/actions";

interface Props {
    categories: Category[];
    id: string;
}

const AddProductForm = ({ categories, id }: Props) => {
    const { toast } = useToast();

    const clientAction = async (formData: FormData) => {
        const result = await addProductAction(id, formData);

        if (result?.message) {
            toast({
                title: result.message,
                description: "Product has been added successfully"
            })
        } else if (result?.error) {
            toast({
                variant: "destructive",
                title: result.error,
                description: "Something went wrong during adding product"
            })
        }
    }

    return (
        <form action={clientAction} className="flex flex-col mt-4 w-[90%]">
            <label htmlFor="name">Name</label>
            <input name="name" placeholder="Type Product Name here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />

            <label htmlFor="description">Description</label>
            <textarea name="description" rows={2} placeholder="Type Product Description here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out"></textarea>

            <div className="flex items-center justify-between mt-2">
                <div className="flex gap-4 items-center">
                    <label htmlFor="price">Price</label>
                    <input name="price" placeholder="Type Price here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />
                </div>

                <div className="flex gap-4 items-center">
                    <label htmlFor="quantity">Quantity</label>
                    <input name="quantity" placeholder="Type Quantity here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />
                </div>

                <Select name="category">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {
                                categories.map((data) => (
                                    <SelectItem key={data.id} value={data.id}>{data.title}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <ButtonLoader text="Add Product" />
        </form>
    )
}

export default AddProductForm