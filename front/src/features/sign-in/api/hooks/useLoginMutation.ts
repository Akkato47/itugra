import { useMutation } from "@tanstack/react-query";

import type { PostLoginConfig } from "../requests/postLogin";
import { postLogin } from "../requests/postLogin";

export const useLoginMutation = (settings?: MutationSettings<typeof postLogin, PostLoginConfig>) =>
  useMutation({
    mutationKey: ["postLogin"],
    mutationFn: (params) =>
      postLogin({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options
  });
