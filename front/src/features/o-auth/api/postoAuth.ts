import type { IoAuthResponse } from "@features/o-auth/types";
import type { IAuthResponse } from "@features/sign-in";

import { api } from "@shared/api";

export type TPostoAuthConfig = RequestConfig<IoAuthResponse>;

export const postoAuth = ({ params, config }: TPostoAuthConfig) =>
  api.post<IAuthResponse>(`auth/oAuth`, params, config);
