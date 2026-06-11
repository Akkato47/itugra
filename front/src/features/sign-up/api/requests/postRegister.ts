import type { IAuthResponse } from "@features/sign-in";

import { api } from "@shared/api";

import type { IRegRequest } from "../types";

export type PostRegisterConfig = TRequestConfig<IRegRequest>;

export const postRegister = ({ params, config }: PostRegisterConfig) =>
  api.post<IAuthResponse>("/auth/register", params, config);
