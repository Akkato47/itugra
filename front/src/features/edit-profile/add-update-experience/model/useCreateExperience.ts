import type { z } from "zod";

import { useCreateProfileExperience } from "../api/hooks/useCreateProfileExperience";
import type { editExperienceFormShema } from "../lib/editExperienceFormSchema";

export const useCreateExperience = () => {
  const { mutate } = useCreateProfileExperience();

  const createExperience = async (
    data:
      | z.infer<typeof editExperienceFormShema>
      | Omit<z.infer<typeof editExperienceFormShema>, "endDate">
  ) => {
    mutate({
      params: data
    });
  };

  return { createExperience };
};
