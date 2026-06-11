import { useQuery } from "@tanstack/react-query";

import { getTeamList } from "../requests/getTeamList";

export const useGetTeamListQuery = ({ config, options }: QuerySettings<typeof getTeamList>) =>
  useQuery({
    queryKey: ["getTeamList"],
    queryFn: () => getTeamList({ config }),
    ...options
  });
