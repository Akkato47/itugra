import { z } from "zod";

export const createEventFormSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  description: z.string().min(1, "Обязательное поле"),
  type: z.string().min(1, "Обязательное поле"),
  registrationEnd: z
    .string()
    .min(1, "Обязательное поле")
    .regex(/(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})/, {
      message: "Неверный формат ввода."
    }),
  end: z
    .string()
    .min(1, "Обязательное поле")
    .regex(/(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})/, {
      message: "Неверный формат ввода."
    }),
  categoryId: z.array(z.number()).min(1, "Обязательное поле")
});
