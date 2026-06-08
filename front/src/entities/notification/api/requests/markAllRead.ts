import { api } from "@shared/api";

export const markAllRead = ({ config }: TRequestConfig) =>
  api.patch(`/notification/read-all`, undefined, config);
