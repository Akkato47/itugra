import type { IMyRequest } from "@entities/event/types";

import { api } from "@shared/api";

export const getMyRequests = async ({ config }: TRequestConfig) =>
  api.get<IMyRequest[]>(`/event/requests/my`, config);
