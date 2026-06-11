import { RoleEnum } from '@/db/drizzle/schema/user/enums/role.enum';

export class SetRoleDto {
  role: RoleEnum;
}

export class SetBanDto {
  banned: boolean;
}
