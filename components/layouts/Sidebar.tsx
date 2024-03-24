import Link from "next/link"

const Sidebar = () => {
  return (
    <div className="border-r w-[20rem] flex flex-col items-end py-[32px] pr-[24px]">
      <Link href="/dashboard/profile">Profile</Link>
      <Link href="/dashboard/stores">Stores</Link>
      <Link href="/dashboard/billing">Billing</Link>
      <Link href="/dashboard/orders" prefetch={false} >My Orders</Link>
      <Link href="/dashboard/deliver">To Deliver</Link>
    </div>
  )
}

export default Sidebar