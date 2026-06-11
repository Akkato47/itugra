import { useQuery } from "@tanstack/react-query";

import { getAdminStats } from "./getAdminStats";

export const useAdminStatsQuery = ({ config, options }: QuerySettings<typeof getAdminStats>) =>
  useQuery({
    queryKey: ["getAdminStats"],
    queryFn: () => getAdminStats({ config }),
    ...options
  });
