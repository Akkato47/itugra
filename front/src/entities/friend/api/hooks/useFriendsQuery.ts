import { useQuery } from "@tanstack/react-query";

import { getFriends } from "../requests/getFriends";

export const useFriendsQuery = ({
  config,
  options,
  tag
}: QuerySettings<typeof getFriends> & { tag: string }) =>
  useQuery({
    queryKey: ["getFriends", tag],
    queryFn: () => getFriends({ config, tag }),
    ...options
  });
