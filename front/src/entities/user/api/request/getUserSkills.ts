import type { IUserSkill } from "@entities/user/types/userInfo";

import { api } from "@shared/api";

interface IGetSkillsResponse {
  userSkills: IUserSkill[];
}

export const getUserSkills = async ({ config }: TRequestConfig) =>
  api.get<IGetSkillsResponse>(`/user/profile/skills`, config);
