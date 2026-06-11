import { api } from "@shared/api";

export type TSetTeamBanConfig = TRequestConfig<{ teamUid: string; banned: boolean }>;
export type TDeleteTeamConfig = TRequestConfig<{ teamUid: string }>;

export const setTeamBan = ({ params, config }: TSetTeamBanConfig) =>
  api.patch(`/admin/teams/${params.teamUid}/ban`, params, config);

export const deleteTeam = ({ params, config }: TDeleteTeamConfig) =>
  api.delete(`/admin/teams/${params.teamUid}`, config);
