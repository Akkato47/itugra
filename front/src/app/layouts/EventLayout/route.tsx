import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router-dom";

import { createAllEventsPageRoute } from "@pages/Events/AllEvents";
import { createCreateEventPageRoute } from "@pages/Events/CreateEvent";
import { createCurrentEventPageRoute } from "@pages/Events/CurrentEvent";
import { createMyEventsPageRoute } from "@pages/Events/MyEvents";

import { Spinner } from "@shared/ui/spinner";

const EventLayout = lazy(() => import("./ui"));

export const createEventLayout = (): RouteObject => ({
  element: (
    <Suspense fallback={<Spinner />}>
      <EventLayout />
    </Suspense>
  ),
  errorElement: <div className=''>Error</div>,
  children: [
    createAllEventsPageRoute(),
    createMyEventsPageRoute(),
    createCurrentEventPageRoute(),
    createCreateEventPageRoute()
  ]
});
