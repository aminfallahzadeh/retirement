import { RouteInterface } from "@/constants/routes";
import { Navigate, Route } from "react-router-dom";

/**
 *
 * @param route a route object
 * @description This function determins that current user can access to this route or not
 */
export const RouteProtector = (
  route: RouteInterface,
  index: number,
  isLoggedIn: boolean | undefined
) => {
  const path = route.path;
  const element = route.element ? <route.element /> : null;

  /**
   * @description This is a layout and routes container
   */
  if (!path) {
    const renderSubRouteItem = (subRoute: RouteInterface) => {
      const subRouteElement = subRoute.element ? <subRoute.element /> : null;

      if (isLoggedIn === false && isLoggedIn !== undefined) {
        return (
          <Route
            key={index}
            path={subRoute?.path}
            element={<Navigate replace={false} to="/login" />}
          />
        );
      }

      return (
        <Route
          key={subRoute?.id}
          path={subRoute?.path}
          element={subRouteElement}
        />
      );
    };

    return (
      <Route key={index} element={element}>
        {route?.subRoutes?.map(renderSubRouteItem)}
      </Route>
    );
  }

  // if (isLoggedIn === false && isLoggedIn !== undefined) {
  //   return <Route key={index} path={route.path} element={<Navigate to="/login" />} />;
  // }
  return <Route key={index} path={path} element={element} />;
};
