import { api } from "@shared/api";

interface ICreateProfileExperience {
  name: string;
  position: string;
  startDate: string;
  endDate?: string;
}

export type TPostProfileExperienceConfig = TRequestConfig<ICreateProfileExperience>;

export const postProfileExperience = ({ params, config }: TPostProfileExperienceConfig) =>
  api.post("/user/profile-experience", params, config);
