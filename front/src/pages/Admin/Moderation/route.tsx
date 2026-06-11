import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const AdminModerationPage = lazy(() => import("./ui"));

export const createAdminModerationPageRoute = (): RouteObject => ({
  path: paths.ADMIN_MODERATION,
  element: (
    <Suspense fallback={<Spinner />}>
      <AdminModerationPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
