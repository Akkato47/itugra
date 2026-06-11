import { useQuery } from "@tanstack/react-query";

import { getNotifications } from "../requests/getNotifications";

export const useNotificationsQuery = ({
  config,
  options
}: QuerySettings<typeof getNotifications> = {}) =>
  useQuery({
    queryKey: ["getNotifications"],
    queryFn: () => getNotifications({ config }),
    ...options
  });
