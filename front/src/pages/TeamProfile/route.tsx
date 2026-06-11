import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui";

const TeamsPage = lazy(() => import("./ui"));
const TeamProfilePage = lazy(() => import("./ui/TeamProfile"));

export const createTeamsRoute = (): RouteObject => ({
  path: paths.TEAMS,
  element: (
    <Suspense fallback={<Spinner />}>
      <TeamsPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});

export const createTeamProfileRoute = (): RouteObject => ({
  path: paths.TEAMS + "/:teamUid",
  element: (
    <Suspense fallback={<Spinner />}>
      <TeamProfilePage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
