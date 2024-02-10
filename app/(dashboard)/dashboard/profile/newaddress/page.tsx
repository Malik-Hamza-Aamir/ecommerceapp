import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ButtonLoader from "@/components/ButtonLoader";
import { addAddressAction } from "@/app/_actions/actions";

const page = async () => {
    const session = await getServerSession(options);
    const id = session?.user?.id as string;



    return (
        <div className="pt-[32px] mr-[20rem] flex-1">
            <h2 className="text-3xl">
                <strong>Add Address</strong>
            </h2>
            <p className="text-gray-500">Link Address to your Account</p>

            <div className="p-8 border-2 rounded-[20px] mt-4">
                <h2 className="text-3xl">
                    <strong>Add Address</strong>
                </h2>
                <p className="text-gray-500">Link Address to your Account</p>

                <form action={addAddressAction.bind(null, id)} className="flex flex-col mt-4 w-[90%]">
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
            </div>
        </div>

    )
}

export default page