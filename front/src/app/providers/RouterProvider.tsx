import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { createAdminLayout } from "@app/layouts/AdminLayout";
import { createNaVzlyotLayout } from "@app/layouts/NaVzlyotLayout";
import { createProfileLayout, createSettingsLayout } from "@app/layouts/ProfileLayout";

import { createLandingRoute } from "@pages/Landing";
import { createSignInRoute, createYandexCallbackPageRoute } from "@pages/SignIn";
import { createSignUpRoute } from "@pages/SignUp";

const router = createBrowserRouter([
  createLandingRoute(),
  createSignInRoute(),
  createSignUpRoute(),
  createYandexCallbackPageRoute(),
  createProfileLayout(),
  createSettingsLayout(),
  createAdminLayout(),
  createNaVzlyotLayout()
]);

export const BrowserRouter = () => <RouterProvider router={router} />;
