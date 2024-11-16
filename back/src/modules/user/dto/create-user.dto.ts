import type { ExpInferInsert } from '@/db/drizzle/schema/user/schema';

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

export class CreateUserSkillsDto {
  skillUid: string;
  level: string;
}
