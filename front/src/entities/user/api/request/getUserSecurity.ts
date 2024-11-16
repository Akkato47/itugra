import { api } from "@shared/api";

interface IGetSecurityResponse {
  mail: string;
  phone: string;
}

export const getUserSecurity = async ({ config }: TRequestConfig) =>
  api.get<IGetSecurityResponse>(`/user/profile/security`, config);
