import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { Spinner } from "@shared/ui/spinner";

const AdminDashboardPage = lazy(() => import("./ui"));

export const createAdminDashboardPageRoute = (): RouteObject => ({
  index: true,
  element: (
    <Suspense fallback={<Spinner />}>
      <AdminDashboardPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
