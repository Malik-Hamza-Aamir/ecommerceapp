"use server";
import { db } from "../db";

export async function getProducts() {
  try {
  } catch (error) {
    return { error: error };
  }
}

export async function getUser(userId: string) {
  try {
    const data = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    return data;
  } catch (error) {
    return { error: error };
  }
}
