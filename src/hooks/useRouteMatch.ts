// IMPORTS
import { matchPath, useLocation } from "react-router-dom";

const useRouteMatch = (patterns: readonly string[]) => {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
};

export default useRouteMatch;
