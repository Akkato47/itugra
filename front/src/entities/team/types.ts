import type { IUserInTeam } from "@entities/user";

export enum ETeamType {
  TEMP = "TEMP",
  PERMANENT = "PERMANENT",
  BANNED = "BANNED"
}

export enum EAbilities {
  ALl = "ALL",
  EDIT = "EDIT",
  POST = "POST",
  INVITE = "INVITE",
  DELTE = "DELTE",
  EVENTREG = "EVENTREG",
  NOTHING = "NOTHING"
}

export interface IRoleInTeam {
  uid: string;
  name: string;
  color: string;
  abilities: EAbilities[];
}

export interface ITeam {
  about: string | null;
  image: IImage | null;
  name: string;
  roles: IRoleInTeam[];
  type: ETeamType;
  uid: string;
  userList: IUserInTeam[];
}

export interface ITeamInvite {
  inviteUid: string;
  createdAt: string;
  teamUid: string;
  teamName: string;
  teamImage: IImage | null;
  roleName: string;
  roleColor: string;
  inviterTag: string;
  inviterName: string;
}
