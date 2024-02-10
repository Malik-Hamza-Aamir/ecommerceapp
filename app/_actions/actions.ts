"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { addressSchema } from "@/lib/types";

export async function addAddressAction(id: string, formData: FormData) {
  const street = formData.get("street") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const country = formData.get("country") as string;
  const zip = formData.get("zip") as string;

  const data = { street, city, state, country, zip };
  const result = addressSchema.parse(data);

  const addressExists = await db.address.count({
    where: {
      userId: id,
    },
  });

  await db.address.create({
    data: {
      city: result.city,
      street: result.street,
      stateProvince: result.state,
      country: result.country,
      zip: result.zip,
      addressType:
        addressExists > 0 || addressExists === 1 ? "SECONDARY" : "PRIMARY",
      userId: id,
    },
  });

  revalidatePath("/dashboard/profile");
}

export async function deleteAddressAction(id: string) {
  await db.address.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/profile");
}

export async function deletePhoneNoAction(id: string) {
  const user = await db.user.update({
    where: {
      id,
    },
    data: {
      phone: null,
    },
  });

  console.log(user);
  revalidatePath("/dashboard/profile");
}
