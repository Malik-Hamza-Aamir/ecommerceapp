"use server";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { addressSchema } from "@/lib/types";

export async function addAddressAction(id: string, formData: FormData) {
  try {
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
    return { message: "Address Added Successfully" };
  } catch (error) {
    return { error: "Error while adding address" };
  }
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

export async function addPhoneNumberAction(id: string, formData: FormData) {
  try {
    const phone = formData.get("phone") as string;

    await db.user.update({
      where: {
        id,
      },
      data: {
        phone,
      },
    });

    revalidatePath("/dashboard/profile");
    return { message: "Phone No Added Successfully" };
  } catch (error) {
    return { error: "Error while adding phone-no" };
  }
}

export async function createStoreAction(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    await db.store.create({
      data: {
        name,
        description,
        userId: id,
      },
    });

    revalidatePath("/dashboard/stores");
    return { message: "Store Created Successfully" };
  } catch (error) {
    return { error: "Error while creating store" };
  }
}

export async function updateStoreInfoAction(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    await db.store.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });

    revalidatePath("/dashboard/stores");
    return { message: "Store Updated Successfully" };
  } catch (error) {
    return { error: "Error Updating Store" };
  }
}

export async function addProductAction(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const quantity = formData.get("quantity") as string;
    const category = formData.get("category") as string;

    await db.product.create({
      data: {
        name,
        description,
        price: Number(price),
        quantity: Number(quantity),
        storeId: id,
        categoryId: category,
      },
    });

    revalidatePath(`/dashboard/stores/${id}/products`);
    return { message: "Product Added Successfully" };
  } catch (error) {
    return { error: "Error Adding Products" };
  }
}

export async function updateProductAction(
  id: string,
  formData: FormData,
  prodId: string
) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const quantity = formData.get("quantity") as string;
    const category = formData.get("category") as string;

    await db.product.update({
      where: {
        id: prodId,
      },
      data: {
        name,
        description,
        price: Number(price),
        quantity: Number(quantity),
        storeId: id,
        categoryId: category,
      },
    });

    revalidatePath(`/dashboard/stores/${id}/products/edit/${prodId}`);
    return { message: "Product Updated Successfully" };
  } catch (error) {
    return { error: "Error Updating Products" };
  }
}

export async function checkImageLinkWithStoreAction(storeId: string) {
  try {
    let isLinked: boolean = false;
    const storeImage = await db.storeImage.findUnique({
      where: {
        storeId,
      },
    });

    if (storeImage) {
      isLinked = true;
    }

    return { storeImage: storeImage, isLinked: isLinked };
  } catch (error) {
    return { error: "Error checking Store Image Id" };
  }
}

export async function updateStoreImageAction(
  storeImageId: string,
  storeId: string,
  key: string,
  url: string
) {
  try {
    await db.storeImage.update({
      where: {
        id: storeImageId,
      },
      data: {
        key,
        url,
      },
    });

    revalidatePath(`/dashboard/stores/${storeId}`);
    return { message: "Image Updated Successfully" };
  } catch (error) {
    return { error: "Error Updating Store Image Id" };
  }
}

export async function createStoreImageAction(
  storeId: string,
  key: string,
  url: string
) {
  try {
    await db.storeImage.create({
      data: {
        key,
        url,
        storeId,
        uploadStatus: "SUCCESS",
      },
    });

    revalidatePath(`/dashboard/stores/${storeId}`);
    return { message: "Store Image Added" };
  } catch (error) {
    return { error: "Error Creating Store Image" };
  }
}
