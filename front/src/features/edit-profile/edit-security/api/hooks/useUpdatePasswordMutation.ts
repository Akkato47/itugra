import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TPatchUpdatePasswordConfig } from "../request/patchUodatePassword";
import { patchUpdatePassword } from "../request/patchUodatePassword";

export const useUpdatePasswordMutation = (
  settings?: MutationSettings<typeof patchUpdatePassword, TPatchUpdatePasswordConfig>
) =>
  useMutation({
    mutationKey: ["patchUpdatePassword"],
    mutationFn: (params) =>
      patchUpdatePassword({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    onSuccess() {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Пароль успешно обновлен"
      });
      queryClient.invalidateQueries({ queryKey: ["getUserData"] });
    },
    onError(error) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось обновить пароль",
        description: `${error.response.data.message}`
      });
    },

    ...settings?.options
  });
