import { useQuery } from "@tanstack/react-query";

import { getRequestByUid } from "../requests/getRequestByUid";

export const useGetRequestByUidQuery = ({
  config,
  options,
  requestUid
}: QuerySettings<typeof getRequestByUid> & { requestUid: string }) =>
  useQuery({
    queryKey: ["getRequestByUid"],
    queryFn: () => getRequestByUid({ config, requestUid }),
    ...options
  });
