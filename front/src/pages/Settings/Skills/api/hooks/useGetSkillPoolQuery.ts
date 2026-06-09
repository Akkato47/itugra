import { useQuery } from "@tanstack/react-query";

import { getSkillPool } from "../requests/getSkillPool";

export const useGetSkillPoolQuery = ({
  config,
  options,
  search
}: QuerySettings<typeof getSkillPool> & { search?: string }) =>
  useQuery({
    queryKey: ["getSkillPool", search],
    queryFn: () => getSkillPool({ config, search }),
    enabled: Boolean(search),
    ...options
  });
