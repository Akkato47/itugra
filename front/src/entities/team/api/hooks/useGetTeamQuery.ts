import { useQuery } from "@tanstack/react-query";

import { getTeam } from "../requests/getTeam";

export const useGetTeamQuery = ({
  config,
  options,
  teamUid
}: QuerySettings<typeof getTeam> & { teamUid: string }) =>
  useQuery({
    queryKey: ["getTeam"],
    queryFn: () => getTeam({ config, teamUid }),
    ...options
  });
