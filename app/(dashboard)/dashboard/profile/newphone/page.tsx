import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import PhoneForm from "@/components/PhoneForm";

const page = async () => {
    const session = await getServerSession(options);
    const id = session?.user?.id as string;

    return (
        <div className="pt-[32px] mr-[20rem] flex-1">
            <h2 className="text-3xl">
                <strong>Update Phone</strong>
            </h2>
            <p className="text-gray-500">Link a phone number to your account</p>

            <div className="p-8 border-2 rounded-[20px] mt-4">
                <h2 className="text-3xl">
                    <strong>Update Phone</strong>
                </h2>
                <p className="text-gray-500">Link a phone number to your account</p>

                <PhoneForm id={id} />
            </div>
        </div>
    )
}

export default page