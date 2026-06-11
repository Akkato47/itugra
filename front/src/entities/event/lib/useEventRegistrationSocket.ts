import { useEffect } from "react";

import { socket } from "@shared/api/socket";
import { queryClient } from "@shared/constants/tan-stack-query";

export const useEventRegistrationSocket = (eventUid: string) => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const onRegistration = () => {
      queryClient.invalidateQueries({ queryKey: ["getParticipants", eventUid] });
    };

    socket.on("event:registration", onRegistration);

    return () => {
      socket.off("event:registration", onRegistration);
    };
  }, [eventUid]);
};
