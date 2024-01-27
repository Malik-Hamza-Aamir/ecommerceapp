import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const ProductCard = ({ data }: { data: any }) => {
    return (
        <div className="border-2 w-[30%]">
            <Image src="/dummyImage.jpg" alt="product image" width={45} height={45} />
            <h4>{data.name}</h4>
            <h4>$ {data.price}</h4>
            <Link href="/">
                <Button size="sm">Add to cart</Button>
            </Link>
        </div>
    )
}

export default ProductCard;