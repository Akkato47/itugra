import { z } from "zod";

export const signInEmailFormSchema = z.object({
  mail: z
    .string()
    .min(1, {
      message: "Введите адрес электронной почты"
    })
    .email({ message: "Неправильно введен адрес электронной почты" }),
  password: z.string().min(1, {
    message: "Введите пароль"
  })
});
