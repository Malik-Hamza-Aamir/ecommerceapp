import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllOrders } from "@/app/_dataAccess";

const OrdersPage = async () => {
  const session = await getServerSession(options);
  const userId: string = session?.user?.id as string;
  const orders = await getAllOrders(userId);

  return (
    <div className="pt-[32px] pr-[10%] flex-1 flex flex-col max-h-[90vh] overflow-y-auto">
      {
        orders.length > 0 ? (
          orders.map((order) => (
            <div className="border-2 mb-2" key={order.id}>
              <p>${order.totalBill}</p>
              <p>{order.Address}</p>
              <p>{order.createdAt.getDate()}</p>
              <Link href={`/dashboard/orders/${order.id}`}>
                <Button size="sm">See Products</Button>
              </Link>
            </div>
          ))
        ) : (
          <div>No Order as of yet</div>
        )
      }
    </div>
  )
}

export default OrdersPage