import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TPostRequestDecisionConfig } from "./postRequestDecision";
import { postRequestDecision } from "./postRequestDecision";

export const useRequestDecisionMutation = (
  settings?: MutationSettings<typeof postRequestDecision, TPostRequestDecisionConfig>
) =>
  useMutation({
    mutationKey: ["postRequestDecision"],
    mutationFn: (params) =>
      postRequestDecision({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options,
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: ["getAllRequest"] });
      queryClient.invalidateQueries({ queryKey: ["getAllEvents"] });
      queryClient.invalidateQueries({ queryKey: ["getAdminStats"] });
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Решение применено"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      const [error] = args;
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось применить решение",
        description: error.response?.data?.message ?? "Попробуйте ещё раз позже"
      });
      settings?.options?.onError?.(...args);
    }
  });
