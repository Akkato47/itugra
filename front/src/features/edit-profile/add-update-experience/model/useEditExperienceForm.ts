import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import type { IUserExperience } from "@entities/user";

import { editExperienceFormShema } from "../lib/editExperienceFormSchema";

export const useEditExperienceForm = (experience: IUserExperience | null) =>
  useForm<z.infer<typeof editExperienceFormShema>>({
    resolver: zodResolver(editExperienceFormShema),
    defaultValues: {
      name: experience ? experience.name : "",
      position: experience ? experience.position : "",
      present: experience ? experience.present : false,
      endDate: experience ? experience.endDate : "",
      startDate: experience ? experience.startDate : ""
    }
  });
