import { api } from "@shared/api";

interface IUpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export type TPatchUpdatePasswordConfig = TRequestConfig<Partial<IUpdatePasswordRequest>>;

export const patchUpdatePassword = ({ config, params }: TPatchUpdatePasswordConfig) =>
  api.patch("/auth/update-password", params, config);
