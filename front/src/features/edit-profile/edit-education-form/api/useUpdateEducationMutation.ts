import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { IPatchProfileEducationConfig } from "./patchProfileEducation";
import { patchProfileEducation } from "./patchProfileEducation";

export const useUpdateEducationMutation = (
  settings?: MutationSettings<typeof patchProfileEducation, IPatchProfileEducationConfig>
) =>
  useMutation({
    mutationKey: ["patchProfileEducation"],
    mutationFn: (params) =>
      patchProfileEducation({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    onSuccess() {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Данные обновлены!"
      });
      queryClient.invalidateQueries({ queryKey: ["getUserEducation"] });
    },
    onError(error) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось обновить данные",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
    },

    ...settings?.options
  });
