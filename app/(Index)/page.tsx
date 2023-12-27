import { Button } from "@/components/ui/button";
import Link from "next/link";


const page = async () => {
  return (
    <div className="px-[6rem]">
      <section className="min-h-[75vh] flex items-center justify-center flex-col">
        <h1 className="font-bold px-[5rem] text-[3.4rem] text-center leading-[3rem]">Unleash Style Dive into the Future of E-commerce with Our Cutting-Edge Collection!</h1>
        <h3 className="font-normal px-[450px] text-[1.2rem] text-center leading-6 text-gray-500 my-4">Buy and sell clothing from independent brands and stores around the world with ease</h3>
        <div className="flex gap-6">
          <Link href="/">
            <Button>Buy Now</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Sell Now</Button>
          </Link>
        </div>
      </section>

      <section>
        
      </section>
    </div>
  )
}

export default page