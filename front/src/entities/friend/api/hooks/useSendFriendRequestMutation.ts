import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TSendFriendRequestConfig } from "../requests/sendFriendRequest";
import { sendFriendRequest } from "../requests/sendFriendRequest";

export const useSendFriendRequestMutation = (
  settings?: MutationSettings<typeof sendFriendRequest, TSendFriendRequestConfig>
) =>
  useMutation({
    mutationKey: ["sendFriendRequest"],
    mutationFn: (params) =>
      sendFriendRequest({
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
        title: "Заявка отправлена"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      const [error] = args;
      queryClient.invalidateQueries({ queryKey: ["getFriendshipStatus"] });
      queryClient.invalidateQueries({ queryKey: ["getFriendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["getFriends"] });
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось отправить заявку",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
      settings?.options?.onError?.(...args);
    }
  });
