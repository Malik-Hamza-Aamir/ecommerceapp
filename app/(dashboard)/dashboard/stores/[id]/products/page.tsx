import NoProducts from "@/components/NoProducts";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StoreProducts from "@/components/StoreProducts";

const page = async ({ params: { id } }: { params: { id: string } }) => {
  console.log("id :", id);
  const result = await fetch(`http://localhost:3000/api/getstoreproducts?id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store'
    },
  );

  const data = await result.json();
  const products = data.stores.products;

  return (
    <div className="pt-[32px] pr-[10%] flex-1 flex flex-col max-h-[90vh] overflow-y-auto">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl">
            <strong>Products</strong>
          </h1>
          <Link href="/dashboard/stores/new">
            <Button size="sm">Add Products</Button>
          </Link>
        </div>
        <p className="text-gray-500">Checkout your Products</p>
      </div>


      <div className="pt-4 flex justify-between flex-wrap">
        <StoreProducts prodInfo={products} />
      </div>
    </div>
  )
}

export default page;