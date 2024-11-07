import { RouteInterface } from "./AppRouter.types";
import { routes } from "./AppRouter.schema";
import { RouteProtector } from "@/middlewares/RouteProtector";
import { useCallback } from "react";
import { useAppSelector } from "@/hooks/usePreTypesHooks";
import { Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  const { isLoggedIn } = useAppSelector((state) => state.authSlice);

  const renderRoutes = useCallback(
    (routeItem: RouteInterface, index: number) => {
      const path = routeItem.path;
      const element = routeItem?.element
        ? ((<routeItem.element />) as JSX.Element)
        : null;

      const shouldRouteBeProtected = routeItem.isProtected;

      /**
       * Manage protected route here
       */
      if (shouldRouteBeProtected) {
        return RouteProtector(routeItem, index, isLoggedIn);
      } else {
        /**
         * @description This is a layout and routes container
         */
        if (!path && routeItem?.subRoutes?.length) {
          const renderSubRouteItem = (subRouteItem: RouteInterface) => {
            const subRouteElement = subRouteItem?.element ? (
              <subRouteItem.element />
            ) : null;
            return (
              <Route
                key={subRouteItem?.id}
                path={subRouteItem?.path}
                element={subRouteElement}
              />
            );
          };

          return (
            <Route key={index} element={element}>
              {routeItem?.subRoutes?.map(renderSubRouteItem)}
            </Route>
          );
        }

        return <Route key={index} path={path} element={element} />;
      }
    },
    [isLoggedIn]
  );

  return <Routes>{routes.map(renderRoutes)}</Routes>;
};
