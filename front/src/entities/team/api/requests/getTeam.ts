import type { ITeam } from "@entities/team/types";

import { api } from "@shared/api";

export type TGetTeamConfig = TRequestConfig & {
  teamUid: string;
};

export const getTeam = async ({ config, teamUid }: TGetTeamConfig) =>
  api.get<ITeam>(`/team/data/${teamUid}`, config);
