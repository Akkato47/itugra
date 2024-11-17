import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TPostGenerateRoadmapConfig } from "../requests/postGenerateRoadmap";
import { postGenerateRoadmap } from "../requests/postGenerateRoadmap";

export const usePostGenerateRoadmapmutation = (
  settings?: MutationSettings<typeof postGenerateRoadmap, TPostGenerateRoadmapConfig>
) =>
  useMutation({
    mutationKey: ["usePostGenerateRoadmapmutation"],
    mutationFn: (params) =>
      postGenerateRoadmap({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    onSuccess() {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Чеклист готов!"
      });
      queryClient.invalidateQueries({ queryKey: ["getUserSkills"] });
    },
    onError(error) {
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось добавить навык",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
    },
    ...settings?.options
  });
