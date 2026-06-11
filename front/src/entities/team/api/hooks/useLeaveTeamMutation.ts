import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TLeaveTeamConfig } from "../requests/leaveTeam";
import { leaveTeam } from "../requests/leaveTeam";

export const useLeaveTeamMutation = (
  settings?: MutationSettings<typeof leaveTeam, TLeaveTeamConfig>
) =>
  useMutation({
    mutationKey: ["leaveTeam"],
    mutationFn: (params) =>
      leaveTeam({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options,
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: ["getTeamList"] });
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Вы вышли из команды"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      const [error] = args;
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось выйти из команды",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
      settings?.options?.onError?.(...args);
    }
  });
