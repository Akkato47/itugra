import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TDeleteTeamConfig, TSetTeamBanConfig } from "./teamActions";
import { deleteTeam, setTeamBan } from "./teamActions";

const onError = (error: any) =>
  toast({
    className: "bg-red-800 text-white hover:bg-red-700",
    title: "Не удалось обновить команду",
    description: error.response?.data?.message ?? "Попробуйте ещё раз позже"
  });

const onDone = (title: string) => {
  queryClient.invalidateQueries({ queryKey: ["getAdminTeams"] });
  queryClient.invalidateQueries({ queryKey: ["getAdminStats"] });
  toast({ className: "bg-green-600 text-white hover:bg-green-500", title });
};

export const useSetTeamBanMutation = (
  settings?: MutationSettings<typeof setTeamBan, TSetTeamBanConfig>
) =>
  useMutation({
    mutationKey: ["adminSetTeamBan"],
    mutationFn: (params) =>
      setTeamBan({ ...params, ...(params?.config && { config: params.config }) }),
    ...settings?.options,
    onSuccess(...args) {
      onDone("Статус команды обновлён");
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      onError(args[0]);
      settings?.options?.onError?.(...args);
    }
  });

export const useDeleteTeamMutation = (
  settings?: MutationSettings<typeof deleteTeam, TDeleteTeamConfig>
) =>
  useMutation({
    mutationKey: ["adminDeleteTeam"],
    mutationFn: (params) =>
      deleteTeam({ ...params, ...(params?.config && { config: params.config }) }),
    ...settings?.options,
    onSuccess(...args) {
      onDone("Команда удалена");
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      onError(args[0]);
      settings?.options?.onError?.(...args);
    }
  });
