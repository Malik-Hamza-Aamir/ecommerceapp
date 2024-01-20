import { Separator } from "@/components/ui/separator"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import Link from "next/link"
import Image from "next/image"
import { CircleUserRound, MoveRight } from 'lucide-react';

const ProfilePage = async () => {
  const session = await getServerSession(options);
  const userImage = session?.user?.image as string;
  const userId = session?.user?.id as string;

  const response = await fetch(`http://localhost:3000/api/user?id=${userId}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await response.json();
  const userData = jsonResponse.user;

  return (
    <div className="pt-[32px] pr-[10%] flex-1 flex flex-col max-h-[90vh] overflow-y-auto">
      <div>
        <h1 className="text-3xl">
          <strong>Account</strong>
        </h1>
        <p className="text-gray-500">Manage your account settings</p>
        <Separator className="my-2" />
      </div>


      <div className="p-12 bg-zinc-100 rounded-lg">
        <div>
          <h4>Image</h4>
          <Separator className="my-2" />
          <Link href="/" className="flex justify-between items-center hover:bg-gray-200 rounded-md px-3 py-1">
            <div className="flex gap-4 items-center">
              {
                userImage !== "" ? (
                  <Image
                    src={userImage}
                    alt="profile image"
                    width={50}
                    height={50}
                    className="rounded-[50%] border"
                  />
                )
                  :
                  (
                    <CircleUserRound />
                  )
              }

              {userData.username}
            </div>

            <MoveRight className="size-4" />
          </Link>
        </div>

        <div>
          <h4>Email</h4>
          <Separator className="my-2" />
          {userData.email}
        </div>

        <div>
          <h4>Phone</h4>
          <Separator className="my-2" />
          <Link href="/" className="flex justify-between items-center hover:bg-gray-200 rounded-md px-3 py-1">
            {userData.phone ? userData.phone : "Add Phone Number"}
            <MoveRight className="size-4" />
          </Link>
        </div>

        <div>
          <h4>Address</h4>
          <Separator className="my-2" />
          <Link href="/" className="flex justify-between items-center hover:bg-gray-200 rounded-md px-3 py-1">
            {userData.address.length > 0 ? userData.address.map((address: string) => (
              <div>{address}</div>
            )) : "Add Address"}
            <MoveRight className="size-4" />
          </Link>
        </div>
      </div>

    </div>
  )
}

export default ProfilePage