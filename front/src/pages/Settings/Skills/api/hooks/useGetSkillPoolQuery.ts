import { useQuery } from "@tanstack/react-query";

import { getSkillPool } from "../requests/getSkillPool";

export const useGetSkillPoolQuery = ({ config, options }: QuerySettings<typeof getSkillPool>) =>
  useQuery({
    queryKey: ["getTeamList"],
    queryFn: () => getSkillPool({ config }),
    ...options
  });
