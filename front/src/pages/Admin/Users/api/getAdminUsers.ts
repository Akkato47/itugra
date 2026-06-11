import { api } from "@shared/api";

export interface IAdminUser {
  uid: string;
  fullName: string;
  tag: string;
  mail: string;
  role: string;
  image: IImage | null;
  banned: boolean;
}

export type TGetAdminUsersConfig = TRequestConfig & { search?: string };

export const getAdminUsers = async ({ config, search }: TGetAdminUsersConfig) =>
  api.get<IAdminUser[]>(`/admin/users`, { params: { search }, ...config });
