import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { signInEmailFormSchema } from "../lib/sign-in-email-form-schema";

export const useSignInForm = () =>
  useForm<z.infer<typeof signInEmailFormSchema>>({
    resolver: zodResolver(signInEmailFormSchema),
    defaultValues: {
      mail: "",
      password: ""
    }
  });
