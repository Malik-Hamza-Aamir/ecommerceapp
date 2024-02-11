"use client";
import ButtonLoader from "@/components/ButtonLoader";
import { addAddressAction } from "@/app/_actions/actions";
import { useToast } from "./ui/use-toast";

interface Props {
    id: string;
}

const AddressForm = ({ id }: Props) => {
    const { toast } = useToast();

    const clientAction = async (formData: FormData) => {
        const result = await addAddressAction(id, formData);
        if (result?.message) {
            toast({
                title: result.message,
                description: "Address has been added to this account"
            })
        } else if (result?.error) {
            toast({
                variant: "destructive",
                title: result.error,
                description: "Something went wrong during adding the address"
            })
        }
    }


    return (
        <form action={clientAction} className="flex flex-col mt-4 w-[90%]">
            <label htmlFor="street">Street</label>
            <input name="street" placeholder="Street here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />

            <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex gap-4 items-center">
                    <label htmlFor="city">City</label>
                    <input name="city" placeholder="City here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />
                </div>

                <div className="flex gap-4 items-center">
                    <label htmlFor="state">State</label>
                    <input name="state" placeholder="State here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />
                </div>
            </div>

            <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex gap-4 items-center">
                    <label htmlFor="country">Country</label>
                    <input name="country" placeholder="Country here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />
                </div>

                <div className="flex gap-4 items-center">
                    <label htmlFor="zip">Zip</label>
                    <input name="zip" placeholder="State here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />
                </div>
            </div>

            <ButtonLoader text="Add Address" />
        </form>
    )
}

export default AddressForm