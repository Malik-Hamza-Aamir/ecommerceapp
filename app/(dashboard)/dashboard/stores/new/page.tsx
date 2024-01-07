"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const initialData = {
    name: "",
    description: ""
  }
  const [isloading, setIsLoading] = useState(false);
  const [formInput, setFormInput] = useState<{ name: string, description: string }>(initialData);
  const { toast } = useToast()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("form data :", formInput);
    setIsLoading(true);

    try {
      const result = await fetch(
        "http://localhost:3000/api/store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formInput.name,
            description: formInput.description,
          }),
        }
      );

      setFormInput(initialData);
      toast({
        title: "Store Created Successfully!",
        description: "Your store has been added.",
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
    <div className="pt-[32px] mr-[20rem] w-full">
      <h2 className="text-3xl">
        <strong>New Store</strong>
      </h2>
      <p className="text-gray-500">Add a new store to your account</p>

      <div className="p-8 border-2 rounded-[20px] mt-4">
        <h2 className="text-3xl">
          <strong>Add Store</strong>
        </h2>
        <p className="text-gray-500">Add a new store to your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col mt-4 w-[90%]">
          <label htmlFor="name">Name</label>
          <input value={formInput.name} type="text" name="name" onChange={(e) => setFormInput({ ...formInput, name: e.target.value })} placeholder="Type store name here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />

          <label htmlFor="description">Description</label>
          <textarea value={formInput.description} name="description" rows={2} onChange={(e) => setFormInput({ ...formInput, description: e.target.value })} placeholder="Type store description here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out"></textarea>

          <Button type="submit" size="sm" className="w-[7rem] mt-3" disabled={isloading ? true : false}>
            {
              isloading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null
            }
            Add Store
          </Button>
        </form>
      </div>
    </div>
  )
}

export default page