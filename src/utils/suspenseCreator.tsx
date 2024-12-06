// IMPORTS
import { Suspense, LazyExoticComponent, ComponentType } from "react";
import { SuspenseFallback } from "@/shared/components/SuspenseFallback";

/**
 * Suspense Creator
 * @param Component - Lazy-loaded component
 * @returns Component wrapped in Suspense
 */
export const createSuspense = (
  Component: LazyExoticComponent<ComponentType>
): JSX.Element => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Component />
    </Suspense>
  );
};
