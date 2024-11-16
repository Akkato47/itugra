import { api } from "@shared/api";

interface IUpdateProfileRequest {
  uid: string;
  name: string;
  position: string;
  startDate: string;
  endDate: string;
  present: boolean;
}

export type IPatchProfileExperienceConfig = TRequestConfig<IUpdateProfileRequest>;

export const patchProfileExperience = ({ params, config }: IPatchProfileExperienceConfig) =>
  api.patch("/user/profile-expe", params, config);
