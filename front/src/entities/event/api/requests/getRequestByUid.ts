import type { IGetAllRequestResponse } from "@entities/event";

import { api } from "@shared/api";

export type TGetRequestConfig = TRequestConfig & {
  requestUid: string;
};

export const getRequestByUid = async ({ config, requestUid }: TGetRequestConfig) =>
  api.get<IGetAllRequestResponse>(`/event/request/${requestUid}`, config);
