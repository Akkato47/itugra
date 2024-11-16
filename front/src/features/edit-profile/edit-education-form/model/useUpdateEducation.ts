import type { z } from "zod";

import { formateDate } from "@shared/lib/formateDate";

import { useUpdateEducationMutation } from "../api/useUpdateEducationMutation";
import type { editEducationFormShema } from "../lib/editEducationFormShema";

export const useUpdateEducation = () => {
  const { mutate } = useUpdateEducationMutation();

  const updateEducation = async (data: z.infer<typeof editEducationFormShema>) => {
    const [startDate, endDate] = data.educationPeriod.split("-");

    mutate({
      params: {
        direction: data.direction,
        format: data.format,
        university: data.university,
        startDate: formateDate(startDate, "dash"),
        endDate: formateDate(endDate, "dash")
      }
    });
  };

  return { updateEducation };
};
