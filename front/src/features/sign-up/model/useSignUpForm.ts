import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { regFormSchema } from "../lib/sign-up-form-schema";

export const useSignUpForm = () =>
  useForm<z.infer<typeof regFormSchema>>({
    resolver: zodResolver(regFormSchema),
    defaultValues: {
      birthDate: "",
      fullName: "",
      mail: "",
      phone: "",
      password: "",
      repeatedPassword: ""
    }
  });
