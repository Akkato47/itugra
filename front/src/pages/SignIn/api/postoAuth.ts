import type { IoAuthResponse } from "@features/o-auth/types";

import { api } from "@shared/api";
import { paths } from "@shared/constants/react-router";

export type TPostoAuthConfig = RequestConfig<IoAuthResponse>;

export const postoAuth = async ({ params, config }: TPostoAuthConfig) =>
  api
    .post(`auth/oAuth`, params, config)
    .then(() => {
      // localStorage.setItem(AUTH_KEY, "true");
      window.location.href = paths.PROFILE;
    })
    .catch((error) => {
      console.error(error);
    });
