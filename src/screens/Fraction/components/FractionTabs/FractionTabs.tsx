// IMPORTS
import { Box, Tab, Tabs } from "@mui/material";
import { SUBMIT_FRACTION, CALCULATE_FRACTION } from "@/constants/const";
import useRouteMatch from "@/hooks/useRouteMatch";
import { Link, Outlet } from "react-router-dom";

export const FractionTabs = () => {
  // HANDLERS
  const routeMatch = useRouteMatch([
    "/retirement/fraction/calculate/:step",
    "/retirement/fraction",
  ]);

  // CONSTS
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
