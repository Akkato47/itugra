import { useEffect } from "react";

import { socket } from "@shared/api/socket";
import { queryClient } from "@shared/constants/tan-stack-query";
import { toast } from "@shared/model/use-toast";

import { EModerationStatus } from "../types";

interface IModerationEvent {
  requestUid: string;
  status: EModerationStatus;
  reason?: string;
  eventUid?: string;
}

export const useEventModerationSocket = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const onModeration = (payload: IModerationEvent) => {
      const approved = payload.status === EModerationStatus.APPROVED;

      toast({
        className: approved
          ? "bg-green-600 text-white hover:bg-green-500"
          : "bg-red-800 text-white hover:bg-red-700",
        title: approved ? "Мероприятие одобрено" : "Мероприятие отклонено",
        description: approved ? "Оно опубликовано в списке мероприятий" : payload.reason
      });

      queryClient.invalidateQueries({ queryKey: ["getAllEvents"] });
      queryClient.invalidateQueries({ queryKey: ["getMyRequests"] });
      queryClient.invalidateQueries({ queryKey: ["getUpcomingEvents"] });
    };

    socket.on("event:moderation", onModeration);

    return () => {
      socket.off("event:moderation", onModeration);
    };
  }, []);
};
