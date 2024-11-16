import type { IUserProfile } from "@entities/user/types/userInfo";

import { api } from "@shared/api";

export type GetUserProfileConfig = TRequestConfig & {
  tag: string;
};

export const getUserProfile = async ({ config, tag }: GetUserProfileConfig) =>
  api.get<IUserProfile>(`/user/profile/all/${tag}`, config);
