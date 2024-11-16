import { useQuery } from "@tanstack/react-query";

import { getEventByUid } from "../requests/getEventByUid";

export const useGetEventByUidQuery = ({
  config,
  options,
  eventUid
}: QuerySettings<typeof getEventByUid> & { eventUid: string }) =>
  useQuery({
    queryKey: ["getEventByUid"],
    queryFn: () => getEventByUid({ config, eventUid }),
    ...options
  });
