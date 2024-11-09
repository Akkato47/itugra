import { api } from "@shared/api/instance";
import { AUTH_KEY, PATHS } from "@shared/constants";

import type { IoAuthResponse } from "../types";

export type TPostoAuthConfig = RequestConfig<IoAuthResponse>;

export const postoAuth = async ({ params, config }: TPostoAuthConfig) =>
  api
    .post(`auth/oAuth`, params, config)
    .then(() => {
      localStorage.setItem(AUTH_KEY, "true");
      window.location.href = PATHS.PROFILE;
    })
    .catch((error) => {
      console.error(error);
    });
