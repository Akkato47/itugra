import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const CreatedEventsPage = lazy(() => import("./ui"));

export const createCreatedEventsPageRoute = (): RouteObject => ({
  path: paths.CREATED_EVENTS,
  element: (
    <Suspense fallback={<Spinner />}>
      <CreatedEventsPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
