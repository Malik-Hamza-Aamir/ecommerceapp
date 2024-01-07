import { options } from "@/app/api/auth/[...nextauth]/options"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import Link from "next/link"
import StoreCard from "@/components/StoreCard"
import NoStores from "@/components/NoStores"

const page = async () => {
  const session = await getServerSession(options)
  const userId = session?.user?.id as string;

  const result = await fetch("http://localhost:3000/api/getstores",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId
      }),
      cache: 'no-store'
    },
  );
  const data = await result.json();
  const stores = data.stores;

  return (
    <div className="pt-[32px] pr-[10%] flex-1 flex flex-col max-h-[90vh] overflow-y-auto">
      <div>
        <div className="flex justify-between">
          <h1 className="text-3xl">
            <strong>Stores</strong>
          </h1>
          <Link href="/dashboard/stores/new">
            <Button size="sm">Create Store</Button>
          </Link>
        </div>
        <p className="text-gray-500">Manage Your Store</p>
      </div>


      <div className="pt-4 flex justify-between flex-wrap">
        {
          stores.length > 0 ?
            stores.map((data: any) => (
              <StoreCard key={data.id} storeInfo={data} />
            ))
            :
            <NoStores />
        }
      </div>
    </div>
  )
}

export default page