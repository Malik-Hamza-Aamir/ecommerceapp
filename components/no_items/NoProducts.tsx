import { ShoppingBasket } from 'lucide-react';

const NoProducts = () => {
  return (
    <div className="border px-5 py-3 rounded-lg bg-[#fafafa] flex gap-4">
      <ShoppingBasket className="font-normal" />
      <div>
        <strong className="text-md font-semibold">No Products Added Yet</strong>
        <p className="text-sm">Add Products and Start Earning Today!</p>
      </div>
    </div>
  )
}

export default NoProducts