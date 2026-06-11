import { z } from "zod";

export const editProfileFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, { message: "Введите ФИО" })
    .regex(/^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+(?: [А-ЯЁ][а-яё]+)?$/u, { message: "Невалидное ФИО" })
    .max(60, { message: "Максимальная длинна - 60 символов" }),
  tag: z.string(),
  status: z.string(),
  isSearchingJob: z.boolean(),
  about: z.string(),
  userLocation: z
    .object({
      country: z.string(),
      region: z.string(),
      city: z.string()
    })
    .nullable(),
  image: z
    .object({
      fileUrl: z.string(),
      name: z.string(),
      uid: z.string(),
      thumbnailUrl: z.string()
    })
    .nullable(),
  backGroundImage: z
    .object({
      fileUrl: z.string(),
      name: z.string(),
      uid: z.string(),
      thumbnailUrl: z.string()
    })
    .nullable(),
  birthDate: z.string()
});
