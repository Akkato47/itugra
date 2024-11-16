import { api } from "@shared/api";

import type { ICreateTeamDto } from "./dto";

export type PostLoginConfig = TRequestConfig<ICreateTeamDto>;

export const postCreateTeam = ({ params, config }: PostLoginConfig) =>
  api.post<any>(`/team/create`, params, config);
