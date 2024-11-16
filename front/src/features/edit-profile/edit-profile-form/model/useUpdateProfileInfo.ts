/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useUser } from "@entities/user";

import { queryClient } from "@shared/constants/tan-stack-query";
import { useToast } from "@shared/model/use-toast";

import type { IUserDataRequest } from "../api/patchUpdateUser";
import { useUserProfileMutation } from "../api/useUserProfileMutation";

export const useUpdateProfileInfo = () => {
  const { toast } = useToast();
  const { user, setUserContextData } = useUser();

  const { mutate } = useUserProfileMutation({
    options: {
      onSuccess(data) {
        toast({
          className: "bg-green-600 text-white hover:bg-green-500",
          title: "Данные обновлены"
        });
        if ("tag" in data.data) setUserContextData({ ...user!, tag: data.data.tag });
        queryClient.invalidateQueries({ queryKey: ["getUserData"] });
      },
      onError(error) {
        toast({
          className: "bg-red-800 text-white hover:bg-red-700",
          title: "Не удалось обновить данные",
          description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
        });
      }
    }
  });

  const updateProfileInfo = async (data: Partial<IUserDataRequest>) => {
    mutate({
      params: data
    });
  };

  return {
    updateProfileInfo
  };
};
