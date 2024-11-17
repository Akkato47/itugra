import type { ProfileInferInsert } from '@/db/drizzle/schema/user/schema';
import type { EduFormat } from '@/db/drizzle/schema/user/enums/education-format.enum';
import { ImageType } from '@/modules/uploads/types/file.interface';

export class UpdateUserDto {
  fullName?: string;
  birthDate?: string;
  tag?: string;
  image?: ImageType;
  backgroundImage?: ImageType;
  profileInfo: UpdateUserProfileInfoDto;
  profileLoc: UpdateUserLocationDto;
}

export class UpdateUserProfileInfoDto implements Partial<ProfileInferInsert> {
  isSearchingJob?: boolean;
  status?: string;
  about: string;
}

export class UpdateUserExperienceDto {
  uid!: string;
  name?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  present?: boolean;
}

export class UpdateUserEducationDto {
  university?: string;
  direction?: string;
  format: EduFormat;
  startDate?: string;
  endDate?: string;
}

export class UpdateUserLocationDto {
  country?: string;
  region?: string;
  city?: string;
}
