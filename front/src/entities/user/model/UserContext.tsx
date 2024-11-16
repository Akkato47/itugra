/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";

import type { IUserContextProps } from "./types";

export const UserContext = createContext<IUserContextProps>({
  user: undefined,
  setUserContextData: () => {}
});
