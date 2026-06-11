import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const AdminEventsPage = lazy(() => import("./ui"));

export const createAdminEventsPageRoute = (): RouteObject => ({
  path: paths.ADMIN_EVENTS,
  element: (
    <Suspense fallback={<Spinner />}>
      <AdminEventsPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
