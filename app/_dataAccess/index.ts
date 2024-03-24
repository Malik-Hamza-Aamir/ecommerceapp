import { revalidatePath } from "next/cache";
import { db } from "../db";
import { MyOrderedProducts } from "@/common/type";

export async function getAddress(id: string) {
  const address = db.user.findUnique({
    where: {
      id,
    },
    select: {
      address: true,
    },
  });

  return address;
}

export async function getUser(id: string) {
  const user = db.user.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      email: true,
      phone: true,
      address: {
        select: {
          id: true,
          street: true,
          city: true,
          stateProvince: true,
          country: true,
          zip: true,
          addressType: true,
        },
      },
    },
  });

  return user;
}

export async function getStores(id: string) {
  const stores = await db.store.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  return stores;
}

export async function getCategories() {
  const categories = await db.category.findMany();
  return categories;
}

export async function getStoreProducts(storeId: string) {
  const storeProducts = await db.product.findMany({
    where: {
      storeId,
    },
  });

  return storeProducts;
}

export async function getProduct(id: string) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      description: true,
      price: true,
      quantity: true,
      storeId: true,
      categoryId: true,
    },
  });

  return product;
}

export async function getAllProducts() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      quantity: true,
      sizes: true,
      colors: true,
    },
  });

  return products;
}

export async function getStoreImage(id: string) {
  const storeImage = await db.storeImage.findUnique({
    where: {
      storeId: id,
    },
  });

  return storeImage;
}

export async function getAllProductImages(productId: string) {
  const productImages = await db.productImage.findMany({
    where: {
      productId,
    },
  });

  return productImages;
}

export async function getAllOrders(userId: string) {
  const orders = await db.myOrders.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      totalBill: true,
      createdAt: true,
      Address: true,
    },
  });

  return orders;
}

export async function getProductQuantity(orderId: string) {
  const productsQuantity = await db.productQuantity.findMany({
    where: {
      myOrdersId: orderId,
    },
    select: {
      id: true,
      productId: true,
      quantity: true,
    },
  });

  const productsArray: MyOrderedProducts[] = await Promise.all(
    productsQuantity.map(async (productQuantity) => {
      const products = await db.product.findUnique({
        where: {
          id: productQuantity.productId,
        },
      });

      const payload: MyOrderedProducts = {
        id: productQuantity.id,
        productId: productQuantity.productId,
        productName: products?.name as string,
        quantity: productQuantity.quantity,
      };

      return payload;
    })
  );

  return productsArray;
}
