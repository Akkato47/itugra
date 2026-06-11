import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TDeclineInviteConfig } from "../requests/declineInvite";
import { declineInvite } from "../requests/declineInvite";

export const useDeclineInviteMutation = (
  settings?: MutationSettings<typeof declineInvite, TDeclineInviteConfig>
) =>
  useMutation({
    mutationKey: ["declineInvite"],
    mutationFn: (params) =>
      declineInvite({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options,
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: ["getTeamInvites"] });
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Приглашение отклонено"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      const [error] = args;
      queryClient.invalidateQueries({ queryKey: ["getTeamInvites"] });
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось отклонить приглашение",
        description: error.response?.data?.message ?? "Попробуйте ещё раз позже"
      });
      settings?.options?.onError?.(...args);
    }
  });
