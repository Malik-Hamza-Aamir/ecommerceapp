import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"
import { Pencil, ShoppingBasket } from 'lucide-react';
import TooltipWrapper from "../commons/TooltipWrapper";

const StoreCard = ({ storeInfo }: { storeInfo: any }) => {
    return (
        <Card className="w-[32%] mb-[1.5rem]">
            <CardHeader className="h-[220px] border-b">
                <Image
                    src="/dummyImage.jpg"
                    alt="Store Image"
                    height={220}
                    width={75}
                    className="w-[100%] h-[100%] rounded-t-lg"
                />
            </CardHeader>

            <CardContent className="mt-5">
                <CardTitle>{storeInfo.name}</CardTitle>
                <CardDescription className="truncate my-1">{storeInfo.description}</CardDescription>

                <div className="flex flex-row gap-2">
                    <TooltipWrapper content="Edit Store">
                        <Link href={`/dashboard/stores/${storeInfo.id}`}>
                            <Button variant="outline" size="icon">
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </Link>
                    </TooltipWrapper>

                    <TooltipWrapper content="Add/Remove Products">
                        <Link href={`/dashboard/stores/${storeInfo.id}/products`}>
                            <Button variant="outline" size="icon">
                                <ShoppingBasket className="h-4 w-4" />
                            </Button>
                        </Link>
                    </TooltipWrapper>
                </div>
            </CardContent>
        </Card>
    )
}

export default StoreCard