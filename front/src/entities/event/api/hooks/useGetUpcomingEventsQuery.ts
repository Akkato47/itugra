import { useQuery } from "@tanstack/react-query";

import { getUpcomingEvents } from "../requests/getUpcomingEvents";

export const useGetUpcomingEventsQuery = ({
  config,
  options
}: QuerySettings<typeof getUpcomingEvents>) =>
  useQuery({
    queryKey: ["getUpcomingEvents"],
    queryFn: () => getUpcomingEvents({ config }),
    ...options
  });
