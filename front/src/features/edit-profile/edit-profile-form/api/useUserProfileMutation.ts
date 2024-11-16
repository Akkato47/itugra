import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TPatchUserDataConfig } from "./patchUpdateUser";
import { patchUserProfile } from "./patchUpdateUser";

export const useUserProfileMutation = (
  settings?: MutationSettings<typeof patchUserProfile, TPatchUserDataConfig>
) =>
  useMutation({
    mutationKey: ["patchUserData"],
    mutationFn: (params) =>
      patchUserProfile({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    onSuccess() {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Данные обновлены"
      });
      queryClient.invalidateQueries({ queryKey: ["getUserData"] });
    },
    onError(error) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удолось обновить данные",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
    },

    ...settings?.options
  });
