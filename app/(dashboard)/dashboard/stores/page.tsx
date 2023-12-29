import { Button } from "@/components/ui/button"

const page = () => {
  return (
    <div className="pt-[32px] mr-[20rem] flex-1">
        <div>
            <h1 className="text-3xl">
                <strong>Stores</strong>
            </h1>
            <Button>Create Store</Button>
        </div>
            <p>Manage Your Store</p>
    </div>
  )
}

export default page