import { useMutation } from "@tanstack/react-query";

import { postLogout } from "../requests/postLogout";

export const useLogoutMutation = (settings?: MutationSettings<typeof postLogout, TRequestConfig>) =>
  useMutation({
    mutationKey: ["postLogout"],
    mutationFn: (params) =>
      postLogout({
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options
  });
