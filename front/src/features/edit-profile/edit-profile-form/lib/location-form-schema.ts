import { z } from "zod";

export const locationFormSchema = z.object({
  country: z.string(),
  region: z.string(),
  city: z.string()
});
