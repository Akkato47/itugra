import type { IEvent } from "@entities/event/types";

import { api } from "@shared/api";

export type TGetEventConfig = TRequestConfig & {
  eventUid: string;
};

export const getEventByUid = async ({ config, eventUid }: TGetEventConfig) =>
  api.get<IEvent>(`/event/info/${eventUid}`, config);
