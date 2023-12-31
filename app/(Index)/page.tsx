import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shirt, Footprints } from 'lucide-react';
import CategoriesCard from "@/components/CategoriesCard";

const cardDetails = [
  {
    id: 1,
    to: "/categories",
    categoryName: "clothes",
    symbol: <Shirt />,
    productCount: 346
  },
  {
    id: 2,
    to: "/categories",
    categoryName: "footwear",
    symbol: <Footprints />,
    productCount: 110
  },
  {
    id: 3,
    to: "/categories",
    categoryName: "caps",
    symbol: <Shirt />,
    productCount: 84
  },
  {
    id: 4,
    to: "/categories",
    categoryName: "office",
    symbol: <Shirt />,
    productCount: 98
  },
]

const page = async () => {
  return (
    <div className="max-w-6xl mx-auto">
      <section className="flex flex-col items-center justify-center gap-4 py-12 min-h-[70vh]">
        <h1 className=" font-extrabold text-[3.4rem] text-center leading-[3rem]">Unleash Style Dive into the Future of Ecommerce with Our Collection!</h1>
        <h3 className="font-normal text-[1.2rem] text-center leading-6 text-gray-500 my-2  border-2 border-red-500">Buy and sell clothing from independent brands and stores around the world with ease</h3>
        <div className="flex gap-6">
          <Link href="/">
            <Button>Buy Now</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Sell Now</Button>
          </Link>
        </div>
      </section>

      <section className="px-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
          cardDetails.map((details) => (
            <CategoriesCard key={details.id} details={details} />
          ))
        }
      </section>
    </div>
  )
}

export default page