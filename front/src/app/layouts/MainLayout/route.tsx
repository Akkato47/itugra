import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { createNaVzlyotRoute } from "@pages/NaVzlyot";
import { createProfileRoute } from "@pages/Profile";
import { createTeamProfileSettingsRoute } from "@pages/Settings";
import { createTeamProfileRoute, createTeamsRoute } from "@pages/TeamProfile";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const MainLayout = lazy(() => import("./ui"));

export const createMainLayout = (): RouteObject => ({
  path: paths.PROFILE,
  element: (
    <Suspense fallback={<Spinner />}>
      <MainLayout />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>,

  children: [
    createProfileRoute(),
    createTeamsRoute(),
    createTeamProfileSettingsRoute(),
    createTeamProfileRoute()
    // createNaVzlyotRoute()
  ]
});
