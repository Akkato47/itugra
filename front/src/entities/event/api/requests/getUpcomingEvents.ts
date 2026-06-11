import type { IEvent } from "@entities/event/types";

import { api } from "@shared/api";

export const getUpcomingEvents = async ({ config }: TRequestConfig) =>
  api.get<IEvent[]>(`/event/upcoming`, config);
