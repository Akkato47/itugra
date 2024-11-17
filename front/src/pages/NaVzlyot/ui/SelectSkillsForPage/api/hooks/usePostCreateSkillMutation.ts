import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TPostCreateSkillConfig } from "../requests/postCreateSkill";
import { postCreateSkill } from "../requests/postCreateSkill";

export const usePostCreateSkillMutation = (
  settings?: MutationSettings<typeof postCreateSkill, TPostCreateSkillConfig>
) =>
  useMutation({
    mutationKey: ["postCreateSkill"],
    mutationFn: (params) =>
      postCreateSkill({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    onSuccess() {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Навык добавлен!"
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
