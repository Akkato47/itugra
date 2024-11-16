import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { createAdminLayout } from "@app/layouts/AdminLayout/route";

import { createLandingRoute } from "@pages/Landing";
import { createNaVzlyotRoute } from "@pages/NaVzlyot";
import { createSignInRoute, createYandexCallbackPageRoute } from "@pages/SignIn";
import { createSignUpRoute } from "@pages/SignUp";

import { createMainLayout, createSettingsLayout } from "../layouts/MainLayout";

const router = createBrowserRouter([
  createLandingRoute(),
  createSignInRoute(),
  createSignUpRoute(),
  createYandexCallbackPageRoute(),
  createMainLayout(),
  createSettingsLayout(),
  createAdminLayout(),
  createNaVzlyotRoute()
]);

export const BrowserRouter = () => <RouterProvider router={router} />;
