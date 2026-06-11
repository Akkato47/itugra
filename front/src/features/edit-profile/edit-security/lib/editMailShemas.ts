import { z } from "zod";

export const mailSchema = z.object({
  mail: z.string().email({ message: "Некорректный email" })
});
