import { z } from "zod";

export const editFileFormSheme = z.object({
  name: z.string().min(1, "Обязательное поле").max(20, "Максимальное кол-во символов - 20")
});
