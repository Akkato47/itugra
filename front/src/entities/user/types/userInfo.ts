export interface IUserProfile {
  uid: string;
  backgroundImage: IImage | null;
  fullName: string;
  tag: string;
  mail: string;
  phone: string;
  role: string;
  birthDate: string;
  image: IImage | null;
  via: string;
  profileInfo: IUserProfileInfo;
}

export interface IUserProfileInfo {
  userFiles: IFile[];
  isSearchingJob: boolean;
  uid: string;
  user: string;
  status: string;
  about: string;
  userEducation: IUserEducation | null;
  userLocation: IUserLocation | null;
  userExperience: IUserExperience[];
  userInterests: IUserInterest[];
  userSkills: IUserSkill[];
}

export interface IUserInterest {
  name: string;
  uid: string;
}

export interface IUserSkill {
  level: string;
  name: string;
  uid: string;
}

export interface IUserExperience {
  uid: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  position: string;
  startDate: string;
  present: boolean;
  endDate: string;
}

export interface IUserLocation {
  city: string;
  country: string;
  region: string;
}

export interface IUserEducation {
  createdAt: string | null;
  direction: string;
  endDate: string;
  format: string;
  startDate: string;
  university: string;
  updatedAt: string | null;
}
