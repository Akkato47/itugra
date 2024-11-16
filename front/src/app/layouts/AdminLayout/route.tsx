import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import {
  createAdminRequestsHistoryPageRoute,
  createAdminRequestsPageRoute,
  createEditRequestPageRoute
} from "@pages/Admin";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const AdminLayout = lazy(() => import("./ui"));

export const createAdminLayout = (): RouteObject => ({
  path: paths.ADMIN,
  element: (
    <Suspense fallback={<Spinner />}>
      <AdminLayout />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>,

  children: [
    createAdminRequestsPageRoute(),
    createAdminRequestsHistoryPageRoute(),
    createEditRequestPageRoute()
  ]
});
