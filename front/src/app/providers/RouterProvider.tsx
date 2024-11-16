import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
  createNaVzlyotRoute()
]);

export const BrowserRouter = () => <RouterProvider router={router} />;
