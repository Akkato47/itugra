import { useQuery } from "@tanstack/react-query";

import { getAllRequest } from "../requests/getAllRequest";

export const useGetAllRequestsQuery = ({ config, options }: QuerySettings<typeof getAllRequest>) =>
  useQuery({
    queryKey: ["getAllRequest"],
    queryFn: () => getAllRequest({ config }),
    ...options
  });
