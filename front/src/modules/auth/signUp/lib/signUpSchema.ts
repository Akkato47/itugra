import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string(),
  secondName: z.string(),
  phone: z.string(),
  role: z.string(),
  mail: z.string().email({ message: "Неверный адрес электронной почты" }),
  password: z.string(),
  confirmPassword: z.string()
});
