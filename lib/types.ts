import { z } from "zod";

export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  zip: z.string(),
});

export type AddressType = z.infer<typeof addressSchema>;
