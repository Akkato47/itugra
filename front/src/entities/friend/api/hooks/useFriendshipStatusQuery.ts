import { useQuery } from "@tanstack/react-query";

import { getFriendshipStatus } from "../requests/getFriendshipStatus";

export const useFriendshipStatusQuery = ({
  config,
  options,
  tag
}: QuerySettings<typeof getFriendshipStatus> & { tag: string }) =>
  useQuery({
    queryKey: ["getFriendshipStatus", tag],
    queryFn: () => getFriendshipStatus({ config, tag }),
    ...options
  });
