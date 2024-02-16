import UpdateStoreForm from "@/components/forms/UpdateStoreForm";

const StoreDetails = ({ params: { id } }: { params: { id: string } }) => {

  return (
    <div className="pt-[32px] mr-[20rem] flex-1">
      <h2 className="text-3xl">
        <strong>Update Store</strong>
      </h2>
      <p className="text-gray-500">Update information of this store</p>

      <div className="p-8 border-2 rounded-[20px] mt-4">
        <h2 className="text-3xl">
          <strong>Update Store</strong>
        </h2>
        <p className="text-gray-500">Update information of this store</p>

        <UpdateStoreForm id={id} />
      </div>
    </div>
  )
}

export default StoreDetails