import { useMutation } from "@tanstack/react-query";

import type { PostLoginConfig } from "./postCreateTeam";
import { postCreateTeam } from "./postCreateTeam";

export const usePostCreateTeamMutation = (
  settings?: MutationSettings<typeof postCreateTeam, PostLoginConfig>
) =>
  useMutation({
    mutationKey: ["postCreateTeam"],
    mutationFn: (params) =>
      postCreateTeam({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options
  });
