import { z } from "zod";

export const editExperienceFormShema = z
  .object({
    name: z.string().min(1, "Обязательное поле"),
    position: z.string().min(1, "Обязательное поле"),
    startDate: z
      .string()
      .min(1, "Обязательное поле")
      .regex(/(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})/, {
        message: "Неверный формат ввода."
      }),
    endDate: z.string(),
    present: z.boolean()
  })
  .superRefine((data, ctx) => {
    if (!data.present && !data.endDate) {
      ctx.addIssue({
        path: ["endDate"],
        message: "Введите дату окончания или выберите 'По настоящее время'.",
        code: "invalid_type",
        expected: "string",
        received: "string"
      });
    }
    if (!data.present && data.endDate) {
      const regex = /(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(\d{4})/;
      if (!regex.test(data.endDate)) {
        ctx.addIssue({
          path: ["endDate"],
          message: "Неверный формат ввода.",
          code: "invalid_type",
          expected: "string",
          received: "string"
        });
      }
    }
  });
