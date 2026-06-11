import { useQuery } from "@tanstack/react-query";

import { getUserEducation } from "../request/getUserEducation";

export const useGetUserEducation = ({ config, options }: QuerySettings<typeof getUserEducation>) =>
  useQuery({
    queryKey: ["getUserEducation"],
    queryFn: () => getUserEducation({ config }),
    ...options
  });
