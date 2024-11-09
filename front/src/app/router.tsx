import { AuthLayout } from "@modules/auth";
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { PATHS } from "@shared/constants";
import { Spinner } from "@shared/ui/spinner";

import { PrivateRoute } from "./PrivateRoute";

const RootScreen = lazy(() => import("./RootPage"));
const YandexCallbackScreen = lazy(() => import("@modules/auth/oAuth/Yandex"));
const SignInScreen = lazy(() => import("@modules/auth/signIn/"));
const SignUpScreen = lazy(() => import("@modules/auth/signUp"));
const ProfileScreen = lazy(() => import("@modules/user/profile"));

export const routes = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: PATHS.SIGNIN,
        element: (
          <Suspense fallback={<Spinner />}>
            <SignInScreen />
          </Suspense>
        )
      },
      {
        path: PATHS.SIGNUP,
        element: (
          <Suspense fallback={<Spinner />}>
            <SignUpScreen />
          </Suspense>
        )
      }
    ]
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <RootScreen />
      </Suspense>
    )
  },
  {
    path: PATHS.OAUTH_YANDEX,
    element: (
      <Suspense fallback={<Spinner />}>
        <YandexCallbackScreen />
      </Suspense>
    )
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: PATHS.PROFILE,
        element: (
          <Suspense fallback={<Spinner />}>
            <ProfileScreen />
          </Suspense>
        )
      }
    ]
  }
]);
