import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TAcceptInviteConfig } from "../requests/acceptInvite";
import { acceptInvite } from "../requests/acceptInvite";

export const useAcceptInviteMutation = (
  settings?: MutationSettings<typeof acceptInvite, TAcceptInviteConfig>
) =>
  useMutation({
    mutationKey: ["acceptInvite"],
    mutationFn: (params) =>
      acceptInvite({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options,
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: ["getTeamInvites"] });
      queryClient.invalidateQueries({ queryKey: ["getTeamList"] });
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Вы вступили в команду"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      const [error] = args;
      queryClient.invalidateQueries({ queryKey: ["getTeamInvites"] });
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось принять приглашение",
        description: error.response?.data?.message ?? "Попробуйте ещё раз позже"
      });
      settings?.options?.onError?.(...args);
    }
  });
