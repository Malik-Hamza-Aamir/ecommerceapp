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
