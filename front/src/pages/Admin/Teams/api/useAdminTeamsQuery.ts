import { useQuery } from "@tanstack/react-query";

import { getAdminTeams } from "./getAdminTeams";

export const useAdminTeamsQuery = ({
  search,
  config,
  options
}: QuerySettings<typeof getAdminTeams> & { search?: string }) =>
  useQuery({
    queryKey: ["getAdminTeams", search],
    queryFn: () => getAdminTeams({ search, config }),
    ...options
  });
