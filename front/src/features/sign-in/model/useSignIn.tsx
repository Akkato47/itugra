import { useNavigate } from "react-router-dom";
import type { z } from "zod";

import { useUser } from "@entities/user";

import { formatePhone } from "@shared/lib/formatePhone";
import { useToast } from "@shared/model/use-toast";

import { useLoginMutation } from "../api/hooks/useLoginMutation";
import type { signInEmailFormSchema } from "../lib/sign-in-email-form-schema";
import type { signInPhoneFormSchema } from "../lib/sign-in-phone-form-schema";

export const useSignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUserContextData } = useUser();

  const { mutate } = useLoginMutation({
    options: {
      onSuccess(data) {
        setUserContextData(data.data);
        return navigate("/");
      },
      onError(error) {
        toast({
          className: "bg-red-800 text-white hover:bg-red-700",
          title: "Ошибка авторизации",
          description: `${error.response.data.message}`
        });
      }
    }
  });

  const signIn = async (
    data: z.infer<typeof signInEmailFormSchema> | z.infer<typeof signInPhoneFormSchema>
  ) => {
    if ("phone" in data) {
      const formatedPhone = formatePhone(data.phone);

      mutate({
        params: {
          phone: formatedPhone,
          password: data.password
        }
      });
    } else {
      mutate({
        params: data
      });
    }
  };

  return { signIn };
};
