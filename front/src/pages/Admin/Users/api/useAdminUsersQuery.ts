import { useQuery } from "@tanstack/react-query";

import { getAdminUsers } from "./getAdminUsers";

export const useAdminUsersQuery = ({
  search,
  config,
  options
}: QuerySettings<typeof getAdminUsers> & { search?: string }) =>
  useQuery({
    queryKey: ["getAdminUsers", search],
    queryFn: () => getAdminUsers({ search, config }),
    ...options
  });
