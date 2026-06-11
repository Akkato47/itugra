import { useQuery } from "@tanstack/react-query";

import { getParticipants } from "../requests/getParticipants";

export const useGetParticipantsQuery = ({
  eventUid,
  config,
  options
}: QuerySettings<typeof getParticipants> & { eventUid: string }) =>
  useQuery({
    queryKey: ["getParticipants", eventUid],
    queryFn: () => getParticipants({ eventUid, config }),
    ...options
  });
