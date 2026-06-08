import { useEffect } from "react";

import { socket } from "@shared/api/socket";
import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import type { INotification } from "../types";

export const useNotificationsSocket = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const onNotification = (notification: INotification) => {
      queryClient.invalidateQueries({ queryKey: ["getNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["getUnreadCount"] });
      toast({
        className: "bg-slate-900 text-white",
        title: notification.title,
        description: notification.message
      });
    };

    const onNotificationRemove = () => {
      queryClient.invalidateQueries({ queryKey: ["getNotifications"] });
      queryClient.invalidateQueries({ queryKey: ["getUnreadCount"] });
    };

    socket.on("notification", onNotification);
    socket.on("notification:remove", onNotificationRemove);

    return () => {
      socket.off("notification", onNotification);
      socket.off("notification:remove", onNotificationRemove);
    };
  }, []);
};
