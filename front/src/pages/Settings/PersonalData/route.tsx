import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const SettingsPage = lazy(() => import("./ui"));

export const createProfileDataSettingsRoute = (): RouteObject => ({
  path: paths.PERSONAL_DATA_SETTINGS,
  element: (
    <Suspense fallback={<Spinner />}>
      <SettingsPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
