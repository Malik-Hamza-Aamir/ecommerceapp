import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { reloadPageAction } from "@/app/_actions/actions";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const OrdersPage = async () => {
  noStore();
  const session = await getServerSession(options);
  let userId: string = "";
  if (session) {
    userId = session?.user?.id;
  }
  // const orders = await getAllOrders(userId);

  // if (orders) {
  //   await reloadPageAction("/dashboard/orders");
  // }


  return (
    <div className="pt-[32px] pr-[10%] flex-1 flex flex-col max-h-[90vh] overflow-y-auto">
      {/* {
        orders.length > 0 ? (
          orders.map((order) => (
            <div className="border-2 mb-2" key={order.orderId}>
              <p>{order.orderId}</p>
              <p>{order.orderStatus}</p>
              <Link href={`/dashboard/orders/${order.orderId}`}>
                <Button size="sm">See Products</Button>
              </Link>
            </div>
          ))
        ) : (
          <div>No Order as of yet</div>
        )

      } */}
      orders page
    </div>
  )
}

export default OrdersPage