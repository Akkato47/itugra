import type { IGetAllRequestResponse } from "@entities/event";

import { api } from "@shared/api";

export type TGetEventConfig = TRequestConfig & {
  eventUid: string;
};

export const getEventByUid = async ({ config, eventUid }: TGetEventConfig) =>
  api.get<IGetAllRequestResponse>(`/event/info/${eventUid}`, config);
