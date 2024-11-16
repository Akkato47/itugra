import { useQuery } from "@tanstack/react-query";

import { getUserSecurity } from "../request/getUserSecurity";

export const useGetSecurityQuery = ({ config, options }: QuerySettings<typeof getUserSecurity>) =>
  useQuery({
    queryKey: ["getUserSecurity"],
    queryFn: () => getUserSecurity({ config }),
    ...options
  });
