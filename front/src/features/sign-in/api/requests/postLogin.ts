import { api } from "@shared/api";

import type { IAuthRequest, IAuthResponse } from "../types";

export type PostLoginConfig = TRequestConfig<IAuthRequest>;

export const postLogin = ({ params, config }: PostLoginConfig) =>
  api.post<IAuthResponse>(`/auth/login`, params, config);
