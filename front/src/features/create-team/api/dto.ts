import type { ETeamType } from "@entities/team";

export interface ICreateTeamDto {
  name: string;
  type: ETeamType;
}
