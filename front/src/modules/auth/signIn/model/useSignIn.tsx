import { useLocation, useNavigate } from "react-router-dom";
import type { z } from "zod";

import { AUTH_KEY, PATHS } from "@shared/constants";
import { toast } from "@shared/lib/hooks/use-toast";

import { usePostLoginMutation } from "../api/usePostLoginMutation";
import type { signInMailSchema } from "../lib/signInMailSchema";
import type { signInPhoneSchema } from "../lib/signInPhoneSchema";

export const useSignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const posLoginMutation = usePostLoginMutation({
    options: {
      onSuccess: () => {
        localStorage.setItem(AUTH_KEY, "true");
        navigate(location.state?.pathname || PATHS.PROFILE);
      },
      onError(error) {
        if (error?.response?.data?.message) {
          toast({
            className: "bg-red-800 text-white hover:bg-red-700",
            title: "Ошибка авторизации",
            description: `${error.response.data.message}`
          });
        } else {
          toast({
            className: "bg-red-800 text-white hover:bg-red-700",
            title: "Не удалось выполнить запрос"
          });
        }
      }
    }
  });

  const onSubmit = async (values: z.infer<typeof signInPhoneSchema | typeof signInMailSchema>) => {
    await posLoginMutation.mutateAsync({ params: values });
  };

  return { onSubmit, posLoginMutation };
};
