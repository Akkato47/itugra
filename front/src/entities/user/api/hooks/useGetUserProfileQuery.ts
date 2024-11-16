import { useQuery } from "@tanstack/react-query";

import { getUserProfile } from "../request/getUserProfile";

export const useUserDataQuery = ({
  tag,
  config,
  options
}: QuerySettings<typeof getUserProfile> & { tag: string }) =>
  useQuery({
    queryKey: ["getUserData", tag],
    queryFn: () => getUserProfile({ tag, config }),
    ...options
  });
