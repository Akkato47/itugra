import { useEffect, useState } from "react";

import { UserContext } from "./UserContext";
import type { IUserProviderProps, TUserContextData } from "./types";

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<TUserContextData | undefined>(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : undefined;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const setUserContextData = (userData: TUserContextData | undefined) => {
    setUser(userData);
  };

  const value = { user, setUserContextData };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
