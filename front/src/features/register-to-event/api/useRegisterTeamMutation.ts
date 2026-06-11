import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TRegisterTeamConfig } from "./registerTeam";
import { registerTeam } from "./registerTeam";

export const useRegisterTeamMutation = (
  settings?: MutationSettings<typeof registerTeam, TRegisterTeamConfig>
) =>
  useMutation({
    mutationKey: ["registerTeam"],
    mutationFn: (params) =>
      registerTeam({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options,
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: ["getMyRegistrations"] });
      queryClient.invalidateQueries({ queryKey: ["getParticipants"] });
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Команда зарегистрирована на мероприятие"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      const [error] = args;
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось зарегистрировать команду",
        description: error.response?.data?.message ?? "Попробуйте ещё раз позже"
      });
      settings?.options?.onError?.(...args);
    }
  });
