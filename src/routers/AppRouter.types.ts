// IMPORTS
import { ElementType } from "react";

export interface RouteInterface {
  id: number;
  name: string;

  /**
   * If no path, it means the object is related to a route group and should receive
   * a layout component as element
   */
  path?: string;
  element?: ElementType;

  /**
   * If true, the route is protected and should be accessible only if user
   * is logged in
   */
  isProtected: boolean;

  /**
   * If true, the route will be unvisible for logged in users,
   * usefull for hiding auth pages
   */
  hiddenIfLoggedIn?: boolean;

  /**
   * If is a layout and routes container, we should pass sub routes
   */
  subRoutes?: RouteInterface[];
}
