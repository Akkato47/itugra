import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import type { IUserEducation } from "@entities/user";

import { formateDate } from "@shared/lib/formateDate";

import { editEducationFormShema } from "../lib/editEducationFormShema";

export const useEditEducationForm = (education: IUserEducation | null) =>
  useForm<z.infer<typeof editEducationFormShema>>({
    resolver: zodResolver(editEducationFormShema),
    defaultValues: {
      direction: education ? education.direction : "",
      educationPeriod: education
        ? `${formateDate(education.startDate, "dote")}-${formateDate(education.endDate, "dote")}`
        : "",
      format: education ? education.format : "",
      university: education ? education.university : ""
    }
  });
