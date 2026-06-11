import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const EducationSettingsPage = lazy(() => import("./ui"));

export const createEducationSettingsRoute = (): RouteObject => ({
  path: paths.EDUCATION_SETTINGS,
  element: (
    <Suspense fallback={<Spinner />}>
      <EducationSettingsPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
