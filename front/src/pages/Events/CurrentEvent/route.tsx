import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const CurrentEventPage = lazy(() => import("./ui"));

export const createCurrentEventPageRoute = (): RouteObject => ({
  path: paths.PROFILE + "/" + paths.EVENT + "/:eventUid",
  element: (
    <Suspense fallback={<Spinner />}>
      <CurrentEventPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
