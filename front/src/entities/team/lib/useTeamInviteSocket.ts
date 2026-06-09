import { useEffect } from "react";

import { socket } from "@shared/api/socket";
import { queryClient } from "@shared/constants/tan-stack-query";

export const useTeamInviteSocket = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const onInviteUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ["getTeamInvites"] });
      queryClient.invalidateQueries({ queryKey: ["getTeamList"] });
    };

    socket.on("invite:update", onInviteUpdate);

    return () => {
      socket.off("invite:update", onInviteUpdate);
    };
  }, []);
};
