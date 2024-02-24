import { getAllProductImages } from "@/app/_dataAccess"
import ProductImageCard from "@/components/cards/ProductImageCard";
import NoProductImages from "@/components/no_items/NoProductImages";

const page = async ({ params: { id, prodid } }: { params: { id: string, prodid: string } }) => {
    const productImages = await getAllProductImages(prodid);

    return (
        <div className="pt-[32px] mr-[10%] flex-1">
            {
                productImages.length === 0 ? (
                    <NoProductImages prodId={prodid} id={id} />
                ) : (
                    <div className="flex justify-between flex-wrap">
                        {
                            productImages.map((prodImage) => (
                                <ProductImageCard key={prodImage.id} id={prodImage.id} imgSrc={prodImage.url} imageType={prodImage.imageType} prodId={prodid} storeId={id} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default page