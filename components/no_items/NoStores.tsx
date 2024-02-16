import { Store } from 'lucide-react';

const NoStores = () => {
  return (
    <div className="border px-5 py-3 rounded-lg bg-[#fafafa] flex gap-4">
        <Store className="font-normal" />
        <div>
            <strong className="text-md font-semibold">No Store Created Yet</strong>
            <p className="text-sm">Create a Store and Start Earning Today!</p>
        </div>
    </div>
  )
}

export default NoStores