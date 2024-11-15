// IMPORTS
import { RouteInterface } from "./AppRouter.types";
import { AppLayout } from "@/layouts/AppLayout";
import { Cartable } from "@/screens/Cartable";
import { Login, Error } from "@/pages";
import { APP_LAYOUT, CARTABLE, LOGIN, ERROR } from "@/constants/urls/const";

export const routes: RouteInterface[] = [
  {
    id: 1,
    name: APP_LAYOUT,
    element: AppLayout,
    isProtected: false,
    hiddenIfLoggedIn: false,
    subRoutes: [
      {
        name: CARTABLE,
        path: "/retirement",
        element: Cartable,
        isProtected: true,
        hiddenIfLoggedIn: false,
        id: 11,
      },
    ],
  },
  {
    id: 2,
    name: LOGIN,
    path: "/login",
    element: Login,
    isProtected: false,
    hiddenIfLoggedIn: true,
  },
  {
    id: 3,
    name: ERROR,
    path: "*",
    element: Error,
    isProtected: false,
    hiddenIfLoggedIn: false,
  },
];
