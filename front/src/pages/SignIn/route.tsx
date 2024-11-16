import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const SignInPage = lazy(() => import("./ui"));

export const createSignInRoute = (): RouteObject => ({
  path: paths.SIGNIN,
  element: (
    <Suspense fallback={<Spinner />}>
      <SignInPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
