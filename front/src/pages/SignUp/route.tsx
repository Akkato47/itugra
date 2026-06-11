import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui";

const SignUpPage = lazy(() => import("./ui"));

export const createSignUpRoute = (): RouteObject => ({
  path: paths.SIGNUP,
  element: (
    <Suspense fallback={<Spinner />}>
      <SignUpPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
