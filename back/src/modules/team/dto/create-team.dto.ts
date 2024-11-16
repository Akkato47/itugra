import { Abilities } from '@/db/drizzle/schema/team/enum/ability.enum';
import type { TeamTypes } from '@/db/drizzle/schema/team/enum/team-type.enum';

export class CreateTeamDto {
  name: string;
  type: TeamTypes;
}

export class CreateRoleDto {
  teamUid: string;
  name: string;
  abilities: Abilities[];
  color: string;
}

export class CreateInviteUserDto {
  userTag: string;
  teamUid: string;
  ctrUid: string;
}
