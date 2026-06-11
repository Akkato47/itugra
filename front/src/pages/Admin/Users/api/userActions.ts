import { api } from "@shared/api";

export type TSetRoleConfig = TRequestConfig<{ userUid: string; role: string }>;
export type TSetBanConfig = TRequestConfig<{ userUid: string; banned: boolean }>;

export const setUserRole = ({ params, config }: TSetRoleConfig) =>
  api.patch(`/admin/users/${params.userUid}/role`, params, config);

export const setUserBan = ({ params, config }: TSetBanConfig) =>
  api.patch(`/admin/users/${params.userUid}/ban`, params, config);
