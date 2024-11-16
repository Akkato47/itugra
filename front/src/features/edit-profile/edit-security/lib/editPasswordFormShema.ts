import { z } from "zod";

export const editPasswordFormShema = z.object({
  oldPassword: z.string().min(1, "Введите текущий пароль"),
  newPassword: z.string().min(1, "Введите новый пароль"),
  repeatedPassword: z.string().min(1, "Введите новый пароль еще раз")
});
