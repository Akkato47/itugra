import type { IUserLocation } from "@entities/user";

import { api } from "@shared/api";

export interface IUserDataRequest {
  fullName: string;
  birthDate: string;
  tag: string;
  image: IImage;
  backgroundImage: IImage;
  profileInfo: Partial<{
    isSearchingJob: true;
    status: string;
    about: string;
  }>;
  profileLoc: IUserLocation;
}

export type TPatchUserDataConfig = TRequestConfig<Partial<IUserDataRequest>>;

export const patchUserProfile = async ({ config, params }: TPatchUserDataConfig) =>
  api.patch<{ tag: string } | { massage: string }>("/user/profile", params, config);
