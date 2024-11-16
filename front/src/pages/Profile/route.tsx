import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const ProfilePage = lazy(() => import("./ui/"));

export const createProfileRoute = (): RouteObject => ({
  path: paths.PROFILE + ":id",
  element: (
    <Suspense fallback={<Spinner />}>
      <ProfilePage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
