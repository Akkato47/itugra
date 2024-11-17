import { Abilities } from '@/db/drizzle/schema/team/enum/ability.enum';
import { ImageType } from '@/modules/uploads/types/file.interface';

export class UpdateTeamDto {
  uid: string;
  name?: string;
  image: ImageType;
  about?: string;
}

export class UpdateRoleDto {
  uid: string;
  name?: string;
  color?: string;
  abilities?: Abilities[];
}

export class UpdateUserRoleDto {
  userUid: string;
  teamUid: string;
  ctrUid: string;
}
