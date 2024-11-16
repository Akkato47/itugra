import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const MyEventsPage = lazy(() => import("./ui"));

export const createMyEventsPageRoute = (): RouteObject => ({
  path: paths.MY_EVENTS,
  element: (
    <Suspense fallback={<Spinner />}>
      <MyEventsPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
