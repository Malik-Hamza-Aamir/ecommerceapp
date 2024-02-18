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
