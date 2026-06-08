import { api } from "@shared/api";

export const getUnreadCount = async ({ config }: TRequestConfig) =>
  api.get<{ count: number }>(`/notification/unread-count`, config);
