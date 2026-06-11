import type { IAuthResponse } from "@features/sign-in";

export type TUserContextData = IAuthResponse;

export interface IUserContextProps {
  user?: TUserContextData;
  setUserContextData: (user: TUserContextData | undefined) => void;
}

export interface IUserProviderProps {
  children: React.ReactNode;
}
