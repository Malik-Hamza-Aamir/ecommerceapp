"use client";
import ButtonLoader from "../ButtonLoader";
import { useToast } from "../ui/use-toast";
import { addPhoneNumberAction } from "@/app/_actions/actions";

interface Props {
    id: string;
}

const PhoneForm = ({ id }: Props) => {
    const { toast } = useToast();

    const clientAction = async (formData: FormData) => {
        const result = await addPhoneNumberAction(id, formData);
        if (result?.message) {
            toast({
                title: result.message,
                description: "Phone number has been added"
            })
        } else if (result?.error) {
            toast({
                variant: "destructive",
                title: result.error,
                description: "Something went wrong during adding the phone number"
            })
        }
    }

    return (
        <form action={clientAction} className="flex flex-col mt-4 w-[90%]">
            <label htmlFor="phone">Phone Number</label>
            <input name="phone" placeholder="Type Phone Number here..." className="border my-2 px-3 py-2 placeholder:text-sm text-sm rounded-md hover:border-gray-400 transition-all duration-200 ease-in-out" />
            <ButtonLoader text="Add Phone-No" />
        </form>
    )
}

export default PhoneForm