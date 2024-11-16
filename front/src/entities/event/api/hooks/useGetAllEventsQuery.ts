import { useQuery } from "@tanstack/react-query";

import { getAllEvents } from "../requests/getAllEvents";

export const useGetAllEventsQuery = ({ config, options }: QuerySettings<typeof getAllEvents>) =>
  useQuery({
    queryKey: ["getAllEvents"],
    queryFn: () => getAllEvents({ config }),
    ...options
  });
