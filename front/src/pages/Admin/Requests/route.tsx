import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const AdminRequestsPage = lazy(() => import("./ui"));

export const createAdminRequestsPageRoute = (): RouteObject => ({
  path: paths.ADMIN_REQUESTS,
  element: (
    <Suspense fallback={<Spinner />}>
      <AdminRequestsPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});

const AdminRequestsHistoryPage = lazy(() => import("./ui/History"));

export const createAdminRequestsHistoryPageRoute = (): RouteObject => ({
  path: paths.ADMIN_REQUESTS_HISTORY,
  element: (
    <Suspense fallback={<Spinner />}>
      <AdminRequestsHistoryPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});

const EditRequestPage = lazy(() => import("./ui/EditRequest"));

export const createEditRequestPageRoute = (): RouteObject => ({
  path: ":requestUid",
  element: (
    <Suspense fallback={<Spinner />}>
      <EditRequestPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
