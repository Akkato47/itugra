import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TCancelRegistrationConfig } from "./cancelRegistration";
import { cancelRegistration } from "./cancelRegistration";

export const useCancelRegistrationMutation = (
  settings?: MutationSettings<typeof cancelRegistration, TCancelRegistrationConfig>
) =>
  useMutation({
    mutationKey: ["cancelRegistration"],
    mutationFn: (params) =>
      cancelRegistration({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options,
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: ["getMyRegistrations"] });
      queryClient.invalidateQueries({ queryKey: ["getParticipants"] });
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Регистрация отменена"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      const [error] = args;
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось отменить регистрацию",
        description: error.response?.data?.message ?? "Попробуйте ещё раз позже"
      });
      settings?.options?.onError?.(...args);
    }
  });
