import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ReactNode } from "react";

interface Category {
    id: number;
    to: string;
    categoryName: string;
    symbol: ReactNode;
    productCount: number;
}

interface Props {
    details: Category
}

const CategoriesCard = ({ details }: Props) => {
    return (
        <Link href={`${details.to}/${details.categoryName}`}>
            <Card className="flex flex-col max-w-[16rem] items-center justify-center hover:bg-muted/50 transition-all duration-200 ease-in-out">
                <CardHeader>
                    <div className="grid h-11 w-11 place-items-center rounded-full border-2">
                        {details.symbol}
                    </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-1.5">
                    <CardTitle className="capitalize text-lg">{details.categoryName}</CardTitle>
                    <CardDescription>{details.productCount} products</CardDescription>
                </CardContent>
            </Card>
        </Link>
    )
}

export default CategoriesCard