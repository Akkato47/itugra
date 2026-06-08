import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { TRemoveFriendConfig } from "../requests/removeFriend";
import { removeFriend } from "../requests/removeFriend";

export const useRemoveFriendMutation = (
  settings?: MutationSettings<typeof removeFriend, TRemoveFriendConfig>
) =>
  useMutation({
    mutationKey: ["removeFriend"],
    mutationFn: (params) =>
      removeFriend({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options,
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: ["getFriendshipStatus"] });
      queryClient.invalidateQueries({ queryKey: ["getFriends"] });
      toast({
        className: "bg-green-600 text-white hover:bg-green-500",
        title: "Пользователь удалён из друзей"
      });
      settings?.options?.onSuccess?.(...args);
    },
    onError(...args) {
      const [error] = args;
      toast({
        className: "bg-red-800 text-white hover:bg-red-700",
        title: "Не удалось удалить из друзей",
        description: `В ходе отправки запроса произошла ошибка: ${error.response.data.message}`
      });
      settings?.options?.onError?.(...args);
    }
  });
