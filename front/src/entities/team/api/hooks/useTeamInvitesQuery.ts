import { useQuery } from "@tanstack/react-query";

import { getInvites } from "../requests/getInvites";

export const useTeamInvitesQuery = ({
  config,
  options
}: QuerySettings<typeof getInvites> = {}) =>
  useQuery({
    queryKey: ["getTeamInvites"],
    queryFn: () => getInvites({ config }),
    ...options
  });
