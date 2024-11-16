import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const AllEventsPage = lazy(() => import("./ui"));

export const createAllEventsPageRoute = (): RouteObject => ({
  path: paths.ALL_EVENTS,
  element: (
    <Suspense fallback={<Spinner />}>
      <AllEventsPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
