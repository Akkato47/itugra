import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { createAdminLayout } from "@app/layouts/AdminLayout/route";

import { createLandingRoute } from "@pages/Landing";
import { createSignInRoute, createYandexCallbackPageRoute } from "@pages/SignIn";
import { createSignUpRoute } from "@pages/SignUp";
import { createProfileLayout, createSettingsLayout } from "@app/layouts/ProfileLayout";
import { createNaVzlyotLayout } from "@app/layouts/NaVzlyotLayout";


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
