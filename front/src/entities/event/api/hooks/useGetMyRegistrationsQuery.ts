import { useQuery } from "@tanstack/react-query";

import { getMyRegistrations } from "../requests/getMyRegistrations";

export const useGetMyRegistrationsQuery = ({
  config,
  options
}: QuerySettings<typeof getMyRegistrations>) =>
  useQuery({
    queryKey: ["getMyRegistrations"],
    queryFn: () => getMyRegistrations({ config }),
    ...options
  });
