import UpdateStoreForm from "@/components/forms/UpdateStoreForm";
import StoreImageDndZone from "@/components/upload_dropzone/StoreImageDndZone";
import { getStoreImage } from "@/app/_dataAccess";

const StoreDetails = async ({ params: { id } }: { params: { id: string } }) => {
  const storeImage = await getStoreImage(id);
  const url = storeImage?.url;

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
        <StoreImageDndZone id={id} url={url} />
        <UpdateStoreForm id={id} />
      </div>
    </div>
  )
}

export default StoreDetails