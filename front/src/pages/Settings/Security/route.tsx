import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const SecurityPage = lazy(() => import("./ui"));

export const createSecurityRoute = (): RouteObject => ({
  path: paths.SECURITY_SETTINGS,
  element: (
    <Suspense fallback={<Spinner />}>
      <SecurityPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
