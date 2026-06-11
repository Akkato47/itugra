import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const AdminTeamsPage = lazy(() => import("./ui"));

export const createAdminTeamsPageRoute = (): RouteObject => ({
  path: paths.ADMIN_TEAMS,
  element: (
    <Suspense fallback={<Spinner />}>
      <AdminTeamsPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
