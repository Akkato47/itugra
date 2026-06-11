import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { editPasswordFormShema } from "../lib/editPasswordFormShema";

export const useEditPasswordForm = () =>
  useForm<z.infer<typeof editPasswordFormShema>>({
    resolver: zodResolver(editPasswordFormShema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      repeatedPassword: ""
    }
  });
