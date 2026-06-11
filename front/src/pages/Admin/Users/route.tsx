import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const AdminUsersPage = lazy(() => import("./ui"));

export const createAdminUsersPageRoute = (): RouteObject => ({
  path: paths.ADMIN_USERS,
  element: (
    <Suspense fallback={<Spinner />}>
      <AdminUsersPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
