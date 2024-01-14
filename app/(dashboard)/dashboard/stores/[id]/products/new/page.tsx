"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { Product, Category } from "@/common/type";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const page = ({ params: { id } }: { params: { id: string } }) => {
    const initialData: any = {
        name: "",
        description: "",
        price: "",
        quantity: "",
        storeId: "",
        categoryId: ""
    }

    const [isloading, setIsLoading] = useState(false);
    const [formInput, setFormInput] = useState<Product>(initialData);
    const [categories, setCategories] = useState<Category[]>([]);
    const { toast } = useToast();

    const getCategoriesApi = async () => {
        const result = await fetch("http://localhost:3000/api/categories", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: 'no-store'
        })

        const jsonResult = await result.json();
        const category = jsonResult.category;

        setCategories(category);
    }

    useEffect(() => {
        getCategoriesApi();
    }, [])


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await fetch(
                "http://localhost:3000/api/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formInput.name,
                        description: formInput.description,
                        price: formInput.price,
                        quantity: formInput.quantity,
                        storeId: id,
                        categoryId: formInput.categoryId
                    }),
                }
            );

            setFormInput(initialData);
            toast({
                title: "Store Updated Successfully!",
                description: "Your store has been updated.",
            });

        } catch (error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="pt-[32px] mr-[10%] w-full">
            <h2 className="text-3xl">
                <strong>Add Product</strong>
            </h2>
            <p className="text-gray-500">Add Products to this Store</p>

            <div className="p-8 border-2 rounded-[20px] mt-4">
                <h2 className="text-3xl">
                    <strong>Add Product</strong>
                </h2>
                <p className="text-gray-500">Add Products to this Store</p>

                <form onSubmit={handleSubmit} className="flex flex-col mt-4 w-[90%]">
                    <label htmlFor="name">Name</label>
                    <input value={formInput.name} type="text" name="name" onChange={(e) => setFormInput({ ...formInput, name: e.target.value })} placeholder="Type Product Name here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />

                    <label htmlFor="description">Description</label>
                    <textarea value={formInput.description} name="description" rows={2} onChange={(e) => setFormInput({ ...formInput, description: e.target.value })} placeholder="Type Product Description here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out"></textarea>

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-4 items-center">
                            <label htmlFor="price">Price</label>
                            <input value={formInput.price} type="number" name="price" onChange={(e) => setFormInput({ ...formInput, price: Number(e.target.value) })} placeholder="Type Price here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />
                        </div>

                        <div className="flex gap-4 items-center">
                            <label htmlFor="quantity">Quantity</label>
                            <input value={formInput.quantity} type="number" name="quantity" onChange={(e) => setFormInput({ ...formInput, quantity: Number(e.target.value) })} placeholder="Type Quantity here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />
                        </div>

                        <Select onValueChange={(value) => setFormInput({...formInput, categoryId: value})}>
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

                    <Button type="submit" size="sm" className="w-[7rem] mt-3" disabled={isloading ? true : false}>
                        {
                            isloading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null
                        }
                        Add Product
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default page