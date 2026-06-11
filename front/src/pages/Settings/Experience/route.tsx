import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const WorkSettingsPage = lazy(() => import("./ui"));

export const createWorkSettingsRoute = (): RouteObject => ({
  path: paths.WORK_EXPERIENCE_SETTINGS,
  element: (
    <Suspense fallback={<Spinner />}>
      <WorkSettingsPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
