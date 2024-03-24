import { z } from "zod";

export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zip: z.string(),
});

export type AddressType = z.infer<typeof addressSchema>;

export type Products = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  sizes: string[];
  colors: string[];
};

export interface EditProduct {
  name: string;
  description: string;
  price: number;
  quantity: number;
  storeId: string;
  categoryId: string;
}

export interface Category {
  id: string;
  title: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  stateProvince: string;
  country: string;
  zip: string;
  addressType: string;
}

export interface ProductsContext {
  id: string;
  description: string;
  image: string;
  name: string;
  noOfItems: number;
  price: number;
}

export interface ProductContextType {
  products: ProductsContext[];
  setProducts: React.Dispatch<React.SetStateAction<ProductsContext[]>>;
}

export interface ProductOrder {
  productId: string;
  quantity: number;
  myOrdersId: string;
}
