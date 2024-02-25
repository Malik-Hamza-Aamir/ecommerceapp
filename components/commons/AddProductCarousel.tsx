import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

interface Props {
    imgSrc: any;
}

export function AddProductCarousel({ imgSrc }: Props) {
    let imgs;
    if (imgSrc.length > 0) {
        imgs = imgSrc.map((d: any, index: number) => (
            <CarouselItem key={index}>
                <div className="p-1">
                    <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                            <Image src={d.url} alt="product images" width={100} height={100} />
                        </CardContent>
                    </Card>
                </div>
            </CarouselItem>
        ))
    } else {
        imgs = <CarouselItem>
            <div className="p-1">
                <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image src="/dummyImage.jpg" alt="product images" width={100} height={100} />
                    </CardContent>
                </Card>
            </div>
        </CarouselItem>
    }

    return (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                {imgs}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
