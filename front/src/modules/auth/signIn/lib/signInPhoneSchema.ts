import { z } from "zod";

export const signInPhoneSchema = z.object({
  phone: z.string(),
  password: z.string()
});
