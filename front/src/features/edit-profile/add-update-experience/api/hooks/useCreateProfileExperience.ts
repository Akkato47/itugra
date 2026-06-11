import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TPostProfileExperienceConfig } from "../requests/postProfileExperience";
import { postProfileExperience } from "../requests/postProfileExperience";

export const useCreateProfileExperience = (
  settings?: MutationSettings<typeof postProfileExperience, TPostProfileExperienceConfig>
) =>
  useMutation({
    mutationKey: ["postProfileExperience"],
    mutationFn: (params) =>
      postProfileExperience({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    onSuccess() {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Опыт работы добавлен!"
      });
      queryClient.invalidateQueries({ queryKey: ["getUserExperience"] });
    },
    onError(error) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось добавить опыт работы",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
    },
    ...settings?.options
  });
