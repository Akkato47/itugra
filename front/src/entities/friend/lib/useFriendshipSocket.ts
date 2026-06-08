import { useEffect } from "react";

import { socket } from "@shared/api/socket";
import { queryClient } from "@shared/constants/tan-stack-query";

export const useFriendshipSocket = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const onFriendshipUpdate = () => {
      queryClient.invalidateQueries({ queryKey: ["getFriendshipStatus"] });
      queryClient.invalidateQueries({ queryKey: ["getFriends"] });
      queryClient.invalidateQueries({ queryKey: ["getFriendRequests"] });
    };

    socket.on("friendship:update", onFriendshipUpdate);

    return () => {
      socket.off("friendship:update", onFriendshipUpdate);
    };
  }, []);
};
