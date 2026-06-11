import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui";

const NaVzlyotPage = lazy(() => import("./ui"));

export const createNaVzlyotRoute = (): RouteObject => ({
  path: paths.NAVZLYOT,
  element: (
    <Suspense fallback={<Spinner />}>
      <NaVzlyotPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
