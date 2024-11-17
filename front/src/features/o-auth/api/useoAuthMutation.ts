import { useMutation } from "@tanstack/react-query";

import type { TPostoAuthConfig } from "./postoAuth";
import { postoAuth } from "./postoAuth";

export const useOAuthMutation = (settings?: MutationSettings<typeof postoAuth, TPostoAuthConfig>) =>
  useMutation({
    mutationKey: ["postoAuth"],
    mutationFn: (params) =>
      postoAuth({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options
  });
