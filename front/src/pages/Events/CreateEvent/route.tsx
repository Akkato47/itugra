import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const CreateEventPage = lazy(() => import("./ui"));

export const createCreateEventPageRoute = (): RouteObject => ({
  path: paths.PROFILE + "/" + paths.CREATE_EVENT,
  element: (
    <Suspense fallback={<Spinner />}>
      <CreateEventPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
