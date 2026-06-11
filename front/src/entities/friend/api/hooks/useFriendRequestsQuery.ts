import { useQuery } from "@tanstack/react-query";

import { getFriendRequests } from "../requests/getFriendRequests";

export const useFriendRequestsQuery = ({
  config,
  options
}: QuerySettings<typeof getFriendRequests> = {}) =>
  useQuery({
    queryKey: ["getFriendRequests"],
    queryFn: () => getFriendRequests({ config }),
    ...options
  });
