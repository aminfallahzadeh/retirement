// IMPORTS
import { Suspense, LazyExoticComponent, ComponentType } from "react";
import { SuspenseFallback } from "@/shared/components/SuspenseFallback";
import { withRouteGuard } from "@/hoc/RouteGuard";

/**
 * Suspense Creator
 * @param Component - Lazy-loaded component
 * @param requiredParams - Array of required search parameters
 * @returns Component wrapped in Suspense with route guard
 */
export const createSuspense = (
  Component: LazyExoticComponent<ComponentType>,
  requiredParams: string[] = []
): JSX.Element => {
  const GuardedComponent = withRouteGuard(Component, requiredParams);

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <GuardedComponent />
    </Suspense>
  );
};
