// IMPORTS
import { Box, Tab, Tabs } from "@mui/material";
import { SUBMIT_FRACTION, CALCULATE_FRACTION } from "@/constants/const";
import { matchPath, useLocation, Link, Outlet } from "react-router-dom";

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export const FractionTabs = () => {
  // TEST
  const routeMatch = useRouteMatch([
    "/retirement/fraction/calculate/:step",
    "/retirement/fraction",
  ]);
  const currentTab = routeMatch?.pattern.path;

  const content = (
    <div>
      <Box sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
        <Tabs value={currentTab}>
          <Tab
            label={SUBMIT_FRACTION}
            value="/retirement/fraction"
            to="/retirement/fraction"
            component={Link}
          />
          <Tab
            label={CALCULATE_FRACTION}
            value="/retirement/fraction/calculate/:step"
            to="/retirement/fraction/calculate/1"
            component={Link}
          />
        </Tabs>
      </Box>
      <Outlet />
    </div>
  );

  return content;
};
