import { useMutation } from "@tanstack/react-query";

import type { PostRequestDesicionConfig } from "../requests/postRequestDesicion";
import { postRequestDesicion } from "../requests/postRequestDesicion";

export const useDisicionRequestMutation = (
  settings?: MutationSettings<typeof postRequestDesicion, PostRequestDesicionConfig>
) =>
  useMutation({
    mutationKey: ["postRequestDesicion"],
    mutationFn: (params) =>
      postRequestDesicion({
        ...params,
        ...(params?.config && { config: params.config })
      }),
    ...settings?.options
  });
