import { Separator } from "@/components/ui/separator"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import Link from "next/link"
import Image from "next/image"
import { CircleUserRound, MoveRight } from 'lucide-react';
import TooltipWrapper from "@/components/TooltipWrapper"
import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog"
import DndZone from "@/components/DndZone"
import { unstable_noStore } from "next/cache"

const ProfilePage = async () => {
  unstable_noStore()
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
    <div className="pt-[32px] pr-[10%] flex-1 flex flex-col">
      <div>
        <h1 className="text-3xl">
          <strong>Account</strong>
        </h1>
        <p className="text-gray-500">Manage your account settings</p>
        <Separator className="my-2" />
      </div>


      <div className="py-6 pr-[5rem] pl-[2rem] mr-[10rem] bg-zinc-100/50 rounded-lg">
        <div className="mb-[1.5rem]">
          <h4 className="font-semibold">Profile</h4>
          <Separator className="my-2" />
          <TooltipWrapper content="Change Profile Pic">
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer flex justify-between items-center hover:bg-gray-200 rounded-md px-3 py-2">
                  <div className="flex gap-4 items-center">
                    {
                      userImage !== "" ? (
                        <Image
                          src={userImage}
                          alt="profile image"
                          width={50}
                          height={50}
                          className="rounded-[50%] border h-[50px]"
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
                </div>
              </DialogTrigger>
              <DndZone />
            </Dialog>
          </TooltipWrapper>
        </div>

        <div className="mb-[1.5rem]">
          <h4 className="font-semibold">Email Address</h4>
          <Separator className="my-2" />
          <h4 className="px-3 py-1">{userData.email}</h4>
        </div>

        <div className="mb-[1.5rem]">
          <h4 className="font-semibold">Phone Number</h4>
          <Separator className="my-2" />
          <TooltipWrapper content={userData.phone ? "Change Phone Number" : "Add Phone Number"}>
            <Link href="/dashboard/profile/newphone" className="flex justify-between items-center hover:bg-gray-200 rounded-md px-3 py-1">
              {userData.phone ? userData.phone : "No Number Added"}
              <MoveRight className="size-4" />
            </Link>
          </TooltipWrapper>
        </div>

        <div>
          <h4 className="font-semibold">Shipping Address</h4>
          <Separator className="my-2" />
          <TooltipWrapper content={userData.address.length > 0 ? "Modify Address" : "Add Address"}>
            <Link href="/" className="flex justify-between items-center hover:bg-gray-200 rounded-md px-3 py-1">
              {userData.address.length > 0 ? userData.address.map((address: string) => (
                <div>{address}</div>
              )) : "No Address Added"}
              <MoveRight className="size-4" />
            </Link>
          </TooltipWrapper>
        </div>
      </div>

    </div>
  )
}

export default ProfilePage