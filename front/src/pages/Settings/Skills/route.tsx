import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { paths } from "@shared/constants/react-router";
import { Spinner } from "@shared/ui/spinner";

const SkillsSettingsPage = lazy(() => import("./ui"));

export const createSkillsSettingsRoute = (): RouteObject => ({
  path: paths.SKILLS_SETTINGS,
  element: (
    <Suspense fallback={<Spinner />}>
      <SkillsSettingsPage />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>
});
