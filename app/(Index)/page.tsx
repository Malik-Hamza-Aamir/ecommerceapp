import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Shirt, Footprints } from 'lucide-react';
import CategoriesCard from "@/components/CategoriesCard";

const cardDetails = [
  {
    id: 1,
    to: "/",
    categoryName: "Clothes",
    symbol: <Shirt />,
    productCount: 346
  },
  {
    id: 1,
    to: "/",
    categoryName: "Footwear",
    symbol: <Footprints />,
    productCount: 110
  },
  {
    id: 1,
    to: "/",
    categoryName: "Caps",
    symbol: <Shirt />,
    productCount: 84
  },
  {
    id: 1,
    to: "/",
    categoryName: "Office Attire",
    symbol: <Shirt />,
    productCount: 98
  },
]

const page = async () => {
  return (
    <div className="px-[20rem]">
      <section className="min-h-[60vh] flex items-center justify-center flex-col">
        <h1 className="font-bold px-[5rem] text-[3.4rem] text-center leading-[3rem]">Unleash Style Dive into the Future of E-commerce with Our Cutting-Edge Collection!</h1>
        <h3 className="font-normal px-[400px] text-[1.2rem] text-center leading-6 text-gray-500 my-4">Buy and sell clothing from independent brands and stores around the world with ease</h3>
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