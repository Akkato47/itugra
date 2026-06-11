import { z } from "zod";

export const editEducationFormShema = z.object({
  university: z.string().min(1, "Обязательное поле"),
  direction: z.string().min(1, "Обязательное поле"),
  educationPeriod: z
    .string()
    .min(1, "Обязательное поле")
    .regex(
      /(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})-(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})/,
      "Введите данные корректно"
    ),
  format: z.string().min(1, "Обязательное поле")
});
