import type { z } from "zod";

import { useUpdateExperienceMutation } from "../api/hooks/useUpdateExperienceMutation";
import type { editExperienceFormShema } from "../lib/editExperienceFormSchema";

export const useUpdateExperiens = () => {
  const { mutate } = useUpdateExperienceMutation();

  const updateExperience = async (data: z.infer<typeof editExperienceFormShema>, uid: string) => {
    mutate({
      params: { ...data, uid: uid }
    });
  };

  return { updateExperience };
};
