import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "@/App";
import { FC } from "react";
import { ROUTES } from "@/constants/routes";
import { Error } from "@/pages/Error";
import { AppRoute } from "@/shared/types/route";

const renderRoutes = (routes: AppRoute[]) =>
  routes.map((route) => {
    if (route.index) {
      return (
        <Route key={route.id} index path={route.path} element={route.element} />
      );
    }
    return (
      <Route key={route.id} path={route.path} element={route.element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/retirement/" element={<App />}>
        {renderRoutes(ROUTES)}
      </Route>
      <Route path="*" element={<Error />} />
    </>
  )
);

export const AppRouter: FC = () => {
  return <RouterProvider router={router} />;
};
