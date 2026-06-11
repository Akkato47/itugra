import { api } from "@shared/api";

export interface IAdminStats {
  users: number;
  events: number;
  teams: number;
  pendingRequests: number;
  registrations: number;
}

export const getAdminStats = async ({ config }: TRequestConfig) =>
  api.get<IAdminStats>(`/admin/stats`, config);
