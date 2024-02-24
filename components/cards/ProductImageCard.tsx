"use client"
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { deleteProductImageAction } from '@/app/_actions/actions';
import { useToast } from '../ui/use-toast';
import { Badge } from '../ui/badge';

interface Props {
    id: string;
    imgSrc: string;
    imageType: any;
    prodId: string;
    storeId: string;
}

const ProductImageCard = ({ id, imgSrc, imageType, prodId, storeId }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const { toast } = useToast();

    const handleClick = async () => {
        const res = await deleteProductImageAction(id, storeId, prodId);

        if (res?.message) {
            toast({
                title: res.message,
                description: "Product Images has been deleted successfully"
            })
        } else if (res?.error) {
            toast({
                variant: "destructive",
                title: res.error,
                description: "Something went wrong during deleting product images"
            })
        }
    }

    return (
        <div
            className="w-[32.5%] h-[400px] mb-2 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                src={imgSrc}
                alt="product Image"
                width={300}
                height={300}
                className="w-[100%] h-[100%] rounded-lg"
            />

            {
                imageType === "PRIMARY" ? (
                    <Badge className='absolute top-2 left-2 z-20 bg-blue-600 hover:bg-blue-600'>{imageType}</Badge>
                ) : null
            }

            {isHovered && (
                <>
                    <div className="w-[100%] h-[100%] absolute bg-black/25 top-0 rounded-lg z-10" />
                    <Button onClick={handleClick} size="icon" className="bg-red-600 hover:bg-red-500/95 text-white absolute top-2 right-2 z-20">
                        <Trash2 size={20} />
                    </Button>
                </>
            )}
        </div>
    );
};

export default ProductImageCard;
