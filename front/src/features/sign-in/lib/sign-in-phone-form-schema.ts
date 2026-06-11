import { z } from "zod";

export const signInPhoneFormSchema = z.object({
  phone: z.string().min(1, {
    message: "Введите номер телефона"
  }),
  password: z.string().min(1, {
    message: "Введите пароль"
  })
});
