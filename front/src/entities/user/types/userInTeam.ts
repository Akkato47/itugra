import type { EAbilities } from "@entities/team";

export interface IUserInTeam {
  uid: string;
  fullName: string;
  tag: string;
  myAbilities: EAbilities[];
  role: string;
  color: string;
}
