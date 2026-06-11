import type { INotification } from "@entities/notification/types";

import { api } from "@shared/api";

export const getNotifications = async ({ config }: TRequestConfig) =>
  api.get<INotification[]>(`/notification`, config);
