import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import {
  createEducationSettingsRoute,
  createProfileDataSettingsRoute,
  createSecurityRoute,
  createSkillsSettingsRoute,
  createWorkSettingsRoute
} from "@pages/Settings";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const MainLayout = lazy(() => import("./ui"));

export const createSettingsLayout = (): RouteObject => ({
  path: paths.SETTINGS,
  element: (
    <Suspense fallback={<Spinner />}>
      <MainLayout />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>,
  children: [
    createProfileDataSettingsRoute(),
    createSecurityRoute(),
    createEducationSettingsRoute(),
    createWorkSettingsRoute(),
    createSkillsSettingsRoute()
  ]
});
