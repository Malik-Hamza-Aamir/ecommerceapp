import { Button } from "@/components/ui/button"
import Link from "next/link"

const page = () => {
  return (
    <div className="pt-[32px] mr-[20rem] flex-1">
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
  )
}

export default page