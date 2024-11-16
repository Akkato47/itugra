import { z } from "zod";

export const regFormSchema = z.object({
  fullName: z
    .string()
    .min(1, {
      message: "Введите ФИО"
    })
    .regex(/(([А-Я]{1}[а-я]{1,40})(\s[А-Я]{1}[а-я]{1,40})?)\s([А-Я]{1}[а-я]{1,40})/, {
      message: "Невалидное ФИО"
    })
    .max(60, { message: "Максимальная длинна - 60 символов" }),
  mail: z
    .string()
    .min(1, {
      message: "Введите адрес электронной почты"
    })
    .email({ message: "Неправильно введен адрес электронной почты" }),
  phone: z.string().min(10, {
    message: "Введите номер телефона"
  }),
  birthDate: z
    .string()
    .min(10, {
      message: "Введите дату рождения"
    })
    .regex(/(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})/, {
      message: "Неверный формат ввода. Пример: 01.01.2000"
    }),
  password: z.string().min(1, {
    message: "Введите пароль"
  }),
  repeatedPassword: z.string().min(1, {
    message: "Введите пароль ещё раз"
  })
});
