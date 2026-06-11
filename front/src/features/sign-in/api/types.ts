import type { IUserShortInfo } from "@entities/user";

export interface IAuthRequest {
  mail?: string;
  phone?: string;
  password: string;
}

export interface IAuthResponse {
  role: string;
  image: IImage | null;
  tag: string;
  shortInfo: IUserShortInfo;
}
