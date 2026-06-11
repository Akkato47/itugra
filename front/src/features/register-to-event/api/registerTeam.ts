import { api } from "@shared/api";

interface IRegisterTeam {
  eventUid: string;
  teamUid: string;
}

export type TRegisterTeamConfig = TRequestConfig<IRegisterTeam>;

export const registerTeam = ({ params, config }: TRegisterTeamConfig) =>
  api.post(`/event/register/team`, params, config);
