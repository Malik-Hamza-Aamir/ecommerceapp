import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

const StoreCard = ({ storeInfo }: { storeInfo: any }) => {
    return (
        <Link href={`/dashboard/stores/${storeInfo.id}/products`} className="w-[32%] mb-[1.5rem]">
            <Card>
                <CardHeader>
                    <Image src="/dummyImage.jpg" alt="StoreImage" width={45} height={45} />
                </CardHeader>

                <CardContent>
                    <CardTitle>{storeInfo.name}</CardTitle>
                    <CardDescription className="truncate">{storeInfo.description}</CardDescription>
                    <Link href={`/dashboard/stores/${storeInfo.id}`}>
                        <Button size="sm">
                            Edit Store
                        </Button> 
                    </Link>
                </CardContent>
            </Card>
        </Link>
    )
}

export default StoreCard