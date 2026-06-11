import type { EModerationStatus, ETypeEventEnum } from "@entities/event/types";

import { api } from "@shared/api";

export interface IGetAllRequestResponse {
  uid: string;
  name: string;
  type: ETypeEventEnum;
  approved: boolean;
  watched: boolean;
  moderationStatus: EModerationStatus;
  moderationReason: string | null;
  userName: string;
  description: string;
  categoryId: number[];
}

export const getAllRequest = async ({ config }: TRequestConfig) =>
  api.get<IGetAllRequestResponse[]>(`/event/requests/all`, config);
