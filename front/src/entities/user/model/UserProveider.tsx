import { useEffect, useState } from "react";

import { api } from "@shared/api";

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

  useEffect(() => {
    if (!localStorage.getItem("user")) return;

    api
      .get<{ tag: string }>("/user/profile/info")
      .then(({ data }) => {
        setUser((prev) => (prev && prev.tag !== data.tag ? { ...prev, tag: data.tag } : prev));
      })
      .catch(() => undefined);
  }, []);

  const setUserContextData = (userData: TUserContextData | undefined) => {
    setUser(userData);
  };

  const value = { user, setUserContextData };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
