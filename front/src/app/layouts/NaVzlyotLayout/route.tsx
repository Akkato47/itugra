import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { createNaVzlyotRoute } from "@pages/NaVzlyot";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const MainLayout = lazy(() => import("./ui"));

export const createNaVzlyotLayout = (): RouteObject => ({
  path: paths.NAVZLYOT,
  element: (
    <Suspense fallback={<Spinner />}>
      <MainLayout />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>,

  children: [createNaVzlyotRoute()]
});
