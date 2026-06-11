import { useQuery } from "@tanstack/react-query";

import { getUserSkills } from "../request/getUserSkills";

export const useGetUserSkills = ({ config, options }: QuerySettings<typeof getUserSkills>) =>
  useQuery({
    queryKey: ["getUserSkills"],
    queryFn: () => getUserSkills({ config }),
    ...options
  });
