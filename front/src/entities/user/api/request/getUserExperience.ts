import type { IUserExperience } from "@entities/user/types/userInfo";

import { api } from "@shared/api";

interface IGetExperienceResponse {
  userExperience: IUserExperience[];
}

export const getUserExperience = async ({ config }: TRequestConfig) =>
  api.get<IGetExperienceResponse>(`/user/profile/experience`, config);
