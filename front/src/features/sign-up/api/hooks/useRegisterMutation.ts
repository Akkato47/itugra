import { useMutation } from "@tanstack/react-query";

import type { PostRegisterConfig } from "../requests/postRegister";
import { postRegister } from "../requests/postRegister";

export const useRegisterMutation = (
  settings?: MutationSettings<typeof postRegister, PostRegisterConfig>
) =>
  useMutation({
    mutationKey: ["postRegister"],
    mutationFn: (params) =>
      postRegister({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options
  });
