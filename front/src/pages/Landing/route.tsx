import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { Spinner } from "@shared/ui";

const LandingPage = lazy(() => import("./ui"));

export const createLandingRoute = (): RouteObject => ({
  path: "/",
  element: (
    <Suspense fallback={<Spinner />}>
      <LandingPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
