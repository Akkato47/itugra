import { useQuery } from "@tanstack/react-query";

import { getUnreadCount } from "../requests/getUnreadCount";

export const useUnreadCountQuery = ({
  config,
  options
}: QuerySettings<typeof getUnreadCount> = {}) =>
  useQuery({
    queryKey: ["getUnreadCount"],
    queryFn: () => getUnreadCount({ config }),
    ...options
  });
