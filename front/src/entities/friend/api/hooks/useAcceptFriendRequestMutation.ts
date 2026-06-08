import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TAcceptFriendRequestConfig } from "../requests/acceptFriendRequest";
import { acceptFriendRequest } from "../requests/acceptFriendRequest";

export const useAcceptFriendRequestMutation = (
  settings?: MutationSettings<typeof acceptFriendRequest, TAcceptFriendRequestConfig>
) =>
  useMutation({
    mutationKey: ["acceptFriendRequest"],
    mutationFn: (params) =>
      acceptFriendRequest({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options,
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: ["getFriendshipStatus"] });
      queryClient.invalidateQueries({ queryKey: ["getFriendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["getFriends"] });
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Заявка принята"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      const [error] = args;
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось принять заявку",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
      settings?.options?.onError?.(...args);
    }
  });
