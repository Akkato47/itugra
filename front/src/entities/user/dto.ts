export interface IUpdateUserDto {
  fullName?: string;
  birthDate?: string;
  tag?: string;
  image?: IImage;
  backgroundImage?: IImage;
  profileInfo?: IUpdateUserProfileInfoDto;
  experience?: IUpdateUserExperienceDto;
  interests?: IUpdateUserInterestsDto;
  skills?: IUpdateUserSkillsDto;
  education?: IUpdateUserEducationDto;
  location?: IUpdateUserLocationDto;
}

export interface IUpdateUserProfileInfoDto {
  isSearchingJob?: boolean;
  status?: string;
}

export interface IUpdateUserExperienceDto {
  uid: string;
  name: string;
  position: string;
  startDate: string;
  endDate: string;
}

export interface IUpdateUserInterestsDto {
  uid: string;
  name: string;
  level: string;
}

export interface IUpdateUserSkillsDto {
  uid: string;
  name: string;
  level: string;
}

export interface IUpdateUserEducationDto {
  uid: string;
  university: string;
  direction: string;
  format: "FULL" | "PART" | "DIST";
  startDate: string;
  endDate: string;
}

export interface IUpdateUserLocationDto {
  uid: string;
  country: string;
  region: string;
  city: string;
}

export interface ICreateExperienceDto {
  name: string;
  position: string;
  startDate: string;
  endDate: string;
}

export interface ICreateInterestsDto {
  name: string;
}

export interface ICreateSkillsDto {
  name: string;
  level: string;
}
