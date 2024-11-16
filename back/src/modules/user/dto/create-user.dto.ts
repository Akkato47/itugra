import type {
  ExpInferInsert,
  UserInferSelect,
} from '@/db/drizzle/schema/user/schema';
import type { RoleEnum } from '@/db/drizzle/schema/user/enums/role.enum';

export class CreateUserDto {
  fullName!: string;
  mail!: string;
  phone!: string;
  birthDate!: string;
  password?: string;
  oAuthId?: string;
}

export class CreateExperienceDto implements Partial<ExpInferInsert> {
  name!: string;
  position!: string;
  startDate!: string;
  endDate!: string | null;
  present: boolean;
}

export class CreateSkillsDto {
  name!: string;
}
