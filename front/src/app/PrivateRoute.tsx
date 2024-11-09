import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AUTH_KEY, PATHS } from "@shared/constants";

export const PrivateRoute = () => {
  const location = useLocation();
  const authKey = localStorage.getItem(AUTH_KEY);

  if (!authKey) {
    if (authKey === "false") {
      localStorage.setItem(AUTH_KEY, "false");
    }
    return <Navigate to={PATHS.SIGNIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
