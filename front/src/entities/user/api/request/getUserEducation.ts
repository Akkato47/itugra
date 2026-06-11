import type { IUserEducation } from "@entities/user/types/userInfo";

import { api } from "@shared/api";

interface IGetEducationResponse {
  userEducation: IUserEducation | null;
  files: {
    category: "DIP" | "PORTFOLIO" | "RESUME";
    file: TFile;
    uid: string;
  }[];
}

export const getUserEducation = async ({ config }: TRequestConfig) =>
  api.get<IGetEducationResponse>(`/user/profile/education`, config);
