import { api } from "@shared/api";

export type PostRequestDesicionConfig = TRequestConfig<{
  requestUid: string;
  decision: boolean;
}>;

export const postRequestDesicion = ({ params, config }: PostRequestDesicionConfig) =>
  api.post(`/event/make/desicion`, params, config);
