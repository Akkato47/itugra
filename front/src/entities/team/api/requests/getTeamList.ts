import { api } from "@shared/api";

interface IGetTeamListResponse {
  image: IImage | null;
  name: string;
  type: string;
  uid: string;
}

export const getTeamList = async ({ config }: TRequestConfig) =>
  api.get<IGetTeamListResponse[]>(`/team/list`, config);
