import type { UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";

import { useUser } from "@entities/user";

import { formateDate } from "@shared/lib/formateDate";
import { formatePhone } from "@shared/lib/formatePhone";
import { useToast } from "@shared/model/use-toast";

import { useRegisterMutation } from "../api/hooks/useRegisterMutation";
import type { regFormSchema } from "../lib/sign-up-form-schema";

interface IUseSignIn {
  regForm: UseFormReturn<
    {
      fullName: string;
      mail: string;
      phone: string;
      birthDate: string;
      password: string;
      repeatedPassword: string;
    },
    any,
    undefined
  >;
}

export const useSignUp = ({ regForm }: IUseSignIn) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUserContextData } = useUser();

  const { mutate } = useRegisterMutation({
    options: {
      onSuccess(data) {
        setUserContextData(data.data);
        navigate("/");
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

  const registration = async (data: z.infer<typeof regFormSchema>) => {
    const fioArray = data.fullName.split(" ");
    if (data.password !== data.repeatedPassword) {
      regForm.setError("repeatedPassword", {
        message: "Пароли не совпадают",
        type: "validate"
      });
      return;
    }

    const formatedPhone = formatePhone(data.phone);
    const formatedBirthDate = formateDate(data.birthDate, "dash");

    mutate({
      params: {
        fullName: `${fioArray[0]} ${fioArray[1]} ${fioArray[2]}`,
        password: data.password,
        mail: data.mail,
        phone: formatedPhone,
        birthDate: formatedBirthDate
      }
    });
  };

  return { registration };
};
