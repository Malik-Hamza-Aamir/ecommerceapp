import StoreForm from "@/components/forms/StoreForm";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const page = async () => {
  const session = await getServerSession(options);
  const id = session?.user?.id as string;

  return (
    <div className="pt-[32px] mr-[20rem] flex-1">
      <h2 className="text-3xl">
        <strong>New Store</strong>
      </h2>
      <p className="text-gray-500">Add a new store to your account</p>

      <div className="p-8 border-2 rounded-[20px] mt-4">
        <h2 className="text-3xl">
          <strong>Add Store</strong>
        </h2>
        <p className="text-gray-500">Add a new store to your account</p>
        <StoreForm id={id} />
      </div>
    </div>
  )
}

export default page