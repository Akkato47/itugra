import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";

import type { TMarkReadConfig } from "../requests/markRead";
import { markRead } from "../requests/markRead";

export const useMarkReadMutation = (
  settings?: MutationSettings<typeof markRead, TMarkReadConfig>
) =>
  useMutation({
    mutationKey: ["markNotificationRead"],
    mutationFn: (params) =>
      markRead({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options,
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: ["getNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["getUnreadCount"] });
      settings?.options?.onSuccess?.(...args);
    }
  });
