import { api } from "@shared/api";

interface ILeaveTeam {
  teamUid: string;
}

export type TLeaveTeamConfig = TRequestConfig<ILeaveTeam>;

export const leaveTeam = ({ params, config }: TLeaveTeamConfig) =>
  api.delete<boolean>(`/team/leave/${params.teamUid}`, config);
