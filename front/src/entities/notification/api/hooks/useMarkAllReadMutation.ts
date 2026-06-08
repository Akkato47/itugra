import { useMutation } from "@tanstack/react-query";

import { queryClient } from "@shared/constants/tan-stack-query";

import { markAllRead } from "../requests/markAllRead";

export const useMarkAllReadMutation = (
  settings?: MutationSettings<typeof markAllRead>
) =>
  useMutation({
    mutationKey: ["markAllNotificationsRead"],
    mutationFn: () => markAllRead({}),
    ...settings?.options,
    onSuccess(...args) {
      queryClient.invalidateQueries({ queryKey: ["getNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["getUnreadCount"] });
      settings?.options?.onSuccess?.(...args);
    }
  });
