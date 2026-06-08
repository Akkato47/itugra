import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TDeclineFriendRequestConfig } from "../requests/declineFriendRequest";
import { declineFriendRequest } from "../requests/declineFriendRequest";

export const useDeclineFriendRequestMutation = (
  settings?: MutationSettings<typeof declineFriendRequest, TDeclineFriendRequestConfig>
) =>
  useMutation({
    mutationKey: ["declineFriendRequest"],
    mutationFn: (params) =>
      declineFriendRequest({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options,
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: ["getFriendshipStatus"] });
      queryClient.invalidateQueries({ queryKey: ["getFriendRequests"] });
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Заявка отклонена"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      const [error] = args;
      queryClient.invalidateQueries({ queryKey: ["getFriendshipStatus"] });
      queryClient.invalidateQueries({ queryKey: ["getFriendRequests"] });
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось отклонить заявку",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
      settings?.options?.onError?.(...args);
    }
  });
