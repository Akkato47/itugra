import { api } from "@shared/api";

export interface IAdminTeam {
  uid: string;
  name: string;
  type: string;
  image: IImage | null;
  members: number;
}

export type TGetAdminTeamsConfig = TRequestConfig & { search?: string };

export const getAdminTeams = async ({ config, search }: TGetAdminTeamsConfig) =>
  api.get<IAdminTeam[]>(`/admin/teams`, { params: { search }, ...config });
