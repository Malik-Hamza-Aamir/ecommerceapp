import { db } from "../db";

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
