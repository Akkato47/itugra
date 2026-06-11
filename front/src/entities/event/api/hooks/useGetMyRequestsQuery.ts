import { useQuery } from "@tanstack/react-query";

import { getMyRequests } from "../requests/getMyRequests";

export const useGetMyRequestsQuery = ({ config, options }: QuerySettings<typeof getMyRequests>) =>
  useQuery({
    queryKey: ["getMyRequests"],
    queryFn: () => getMyRequests({ config }),
    ...options
  });
