import type { ETypeEventEnum } from "@entities/event/types";

import { api } from "@shared/api";

interface IGetAllEventsResponse {
  uid: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  type: ETypeEventEnum;
  status: string;
  registrationEnd: string;
  end: string;
  userUid: string;
}

export const getAllEvents = async ({ config }: TRequestConfig) =>
  api.get<IGetAllEventsResponse[]>(`/event/all`, config);
