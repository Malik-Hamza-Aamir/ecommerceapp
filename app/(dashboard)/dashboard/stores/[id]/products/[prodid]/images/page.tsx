import { getAllProductImages } from "@/app/_dataAccess"

const page = async ({ params: { prodid } }: { params: { prodid: string } }) => {
    const productImages = await getAllProductImages(prodid);

    return (
        <div className="pt-[32px] mr-[10%] flex-1 border-2">
            {
                productImages.length === 0 ? (
                    <></>
                ) : (
                    <></>
                )
            }
        </div>

        // if length is 0 then a upload card with placeholderImage should appear with an empty
        // then user uploads multiple images or only 1 image. 
        // the multiple images should appear after the the image upload for that we use a client component
        // if we hover on the image card then a overlay should appear on the image
        // the overlay should have a button of delete image also
        // if user delete image the images should be reset to default position
        // a user can upload maximum of 5 images. so we have to check length for displaying the upload button on top right cornor
        // if user uploads 1 image then a button should appear on the last uploaded image on top right cornor
        // if that button is clicked a placeholderImage upload Card should appear

        // if 0 images from db then placeholderImage upload Card appears with no button on the top right cornor
    )
}

export default page