import { useQuery } from "@tanstack/react-query";

import { getUserExperience } from "../request/getUserExperience";

export const useGetUserExperience = ({
  config,
  options
}: QuerySettings<typeof getUserExperience>) =>
  useQuery({
    queryKey: ["getUserExperience"],
    queryFn: () => getUserExperience({ config }),
    ...options
  });
