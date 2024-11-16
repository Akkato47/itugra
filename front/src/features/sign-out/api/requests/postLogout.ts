import { api } from "@shared/api";

export const postLogout = ({ config }: TRequestConfig) => api.post(`/auth/logout`, config);
