import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { PostLoginConfig } from "./postCreateTeam";
import { postCreateTeam } from "./postCreateTeam";

export const usePostCreateTeamMutation = (
  settings?: MutationSettings<typeof postCreateTeam, PostLoginConfig>
) =>
  useMutation({
    mutationKey: ["postCreateTeam"],
    mutationFn: (params) =>
      postCreateTeam({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options,
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: ["getTeamList"] });
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Команда создана!"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      const [error] = args;
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось создать команду",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
      settings?.options?.onError?.(...args);
    }
  });
