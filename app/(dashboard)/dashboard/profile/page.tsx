import { Separator } from "@/components/ui/separator"
import { getServerSession } from "next-auth"
import { options } from "@/app/api/auth/[...nextauth]/options"
import Image from "next/image"
import { CircleUserRound } from 'lucide-react';
import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog"
import DndZone from "@/components/commons/DndZone";
import { unstable_noStore } from "next/cache"
import { getUser } from "@/app/_dataAccess"
import { Badge } from "@/components/ui/badge"
import AddProfileBtn from "@/components/buttons/AddProfileBtn"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { deleteAddressAction, deletePhoneNoAction } from "@/app/_actions/actions";

const ProfilePage = async () => {
  unstable_noStore()
  const session = await getServerSession(options);
  const userImage = session?.user?.image as string;
  const userId = session?.user?.id as string;
  const userData = await getUser(userId);

  let address;
  if (userData?.address) {
    if (userData.address.length > 0) {
      address = userData.address.map(data => (
        <Accordion type="single" collapsible className="w-full" key={data.id}>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div key={data.id} className="flex gap-5 items-center hover:bg-gray-200 rounded-md px-3 py-1" >
                <p>{`${data.street} ${data.country}`}</p>
                {
                  data.addressType === "PRIMARY" ? (
                    <Badge className="bg-[#5777f2] hover:bg-[#5776f2e7]">PRIMARY</Badge>
                  ) : null
                }
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <h4 className="font-semibold">Remove</h4>
              <p className="text-[13px] text-zinc-500">Delete this address and remove it from your account</p>
              <form action={deleteAddressAction.bind(null, data.id)}>
                <button className="hover:underline text-red-600 font-semibold text-[13px]">Remove address</button>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))
    } else {
      address = "No Address Added Yet"
    }
  }


  let phone;
  if (userData?.phone) {
    phone = <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h4 className="px-3 py-1">{userData.phone}</h4>
        </AccordionTrigger>
        <AccordionContent>
          <h4 className="font-semibold">Remove</h4>
          <p className="text-[13px] text-zinc-500">Delete this phone number and remove it from your account</p>
          <form action={deletePhoneNoAction.bind(null, userId)}>
            <button className="hover:underline text-red-600 font-semibold text-[13px]">Remove phone number</button>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  } else {
    phone = <h4 className="px-6 py-1">No phone number added yet</h4>
  }


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
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
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

                  <h4>{userData?.username}</h4>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div>
                  <h4 className="font-semibold">Change</h4>
                  <p className="text-[13px] text-zinc-500">Change this image</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="hover:underline text-[#5777f2] font-semibold text-[13px]">Change profile pic</button>
                    </DialogTrigger>
                    <DndZone />
                  </Dialog>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mb-[1.5rem]">
          <h4 className="font-semibold">Email Address</h4>
          <Separator className="my-2" />
          <h4 className="px-6 py-1">{userData?.email}</h4>
        </div>

        <div className="mb-[1.5rem]">
          <h4 className="font-semibold">Phone Number</h4>
          <Separator className="my-2" />
          {phone}
          {
            userData?.phone ? null : <AddProfileBtn hrefSrc="/dashboard/profile/newphone" text="Add Phone Number" />
          }
        </div>

        <div>
          <h4 className="font-semibold">Shipping Address</h4>
          <Separator className="my-2" />
          {address}
          <AddProfileBtn hrefSrc="/dashboard/profile/newaddress" text="Add Address" />
        </div>

      </div>

    </div>
  )
}

export default ProfilePage