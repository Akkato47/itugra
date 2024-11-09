import { z } from "zod";

export const signInMailSchema = z.object({
  mail: z.string().email({ message: "Неверный адрес электронной почты" }),
  password: z.string()
});
