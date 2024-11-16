import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { IPatchProfileExperienceConfig } from "../requests/patchProfileExperience";
import { patchProfileExperience } from "../requests/patchProfileExperience";

export const useUpdateExperienceMutation = (
  settings?: MutationSettings<typeof patchProfileExperience, IPatchProfileExperienceConfig>
) =>
  useMutation({
    mutationKey: ["patchProfileExperience"],
    mutationFn: (params) =>
      patchProfileExperience({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    onSuccess() {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Данные обновлены!"
      });
      queryClient.invalidateQueries({ queryKey: ["getUserExperience"] });
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
