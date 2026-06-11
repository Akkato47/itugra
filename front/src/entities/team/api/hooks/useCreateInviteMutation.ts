import { useMutation } from "@tanstack/react-query";

import { toast } from "@shared/model/use-toast";

import type { TCreateInviteConfig } from "../requests/createInvite";
import { createInvite } from "../requests/createInvite";

export const useCreateInviteMutation = (
  settings?: MutationSettings<typeof createInvite, TCreateInviteConfig>
) =>
  useMutation({
    mutationKey: ["createInvite"],
    mutationFn: (params) =>
      createInvite({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options,
    onSuccess(...args) {
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Приглашение отправлено"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      const [error] = args;
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось отправить приглашение",
        description: error.response?.data?.message ?? "Попробуйте ещё раз позже"
      });
      settings?.options?.onError?.(...args);
    }
  });
