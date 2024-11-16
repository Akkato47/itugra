import { z } from "zod";

export const createTeamFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Введите название команды"
    })
    .max(15, { message: "Максимальная длинна - 15 символов" })
});
