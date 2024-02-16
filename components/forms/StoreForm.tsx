"use client"
import ButtonLoader from "../buttons/ButtonLoader"
import { createStoreAction } from "@/app/_actions/actions"
import { useToast } from "../ui/use-toast"

const StoreForm = ({ id }: { id: string }) => {
  const { toast } = useToast();

  const clientAction = async (formData: FormData) => {
    const result = await createStoreAction(id, formData);

    if (result?.message) {
      toast({
        title: result.message,
        description: "New Store has been added to this account"
      })
    } else if (result?.error) {
      toast({
        variant: "destructive",
        title: result.error,
        description: "Something went wrong during creating store"
      })
    }
  }

  return (
    <form action={clientAction} className="flex flex-col mt-4 w-[90%]">
      <label htmlFor="name">Name</label>
      <input name="name" placeholder="Type store name here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />

      <label htmlFor="description">Description</label>
      <textarea name="description" rows={2} placeholder="Type store description here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out"></textarea>

      <ButtonLoader text="Add Store" />
    </form>
  )
}

export default StoreForm