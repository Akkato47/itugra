import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const TeamProfileSettingsPage = lazy(() => import("./ui"));

export const createTeamProfileSettingsRoute = (): RouteObject => ({
  path: paths.TEAMS + "/:teamUid/settings",
  element: (
    <Suspense fallback={<Spinner />}>
      <TeamProfileSettingsPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
