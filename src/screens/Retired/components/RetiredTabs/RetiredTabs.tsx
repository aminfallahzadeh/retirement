// IMPORTS
import { Box, Tab, Tabs } from "@mui/material";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import useRouteMatch from "@/hooks/useRouteMatch";
import { useAppSelector } from "@/hooks/usePreTypesHooks";
import {
  RELATED_GROUP,
  HEIR_GROUP,
  STATEMENTS,
  PAYSLIP,
  REQUESTS,
} from "@/constants/const";

export const RetiredTabs = () => {
  // STATES
  const [searchParams] = useSearchParams();

  // HANDLERS
  const routeMatch = useRouteMatch([
    "/retirement/retired/statements",
    "/retirement/retired/requests",
    "/retirement/retired/slips",
    "/retirement/retired",
  ]);

  // CONSTS
  const queryParams = searchParams.toString();
  const { personDeathDate } = useAppSelector((state) => state.person);
  const currentTab = routeMatch?.pattern.path;

  // HANDLERS
  const buildPath = (basePath: string) =>
    queryParams ? `${basePath}?${queryParams}` : basePath;

  // CONTENT
  const content = (
    <div>
      <Box sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
        <Tabs value={currentTab}>
          <Tab
            label={personDeathDate ? HEIR_GROUP : RELATED_GROUP}
            value="/retirement/retired"
            to={buildPath("/retirement/retired")}
            component={Link}
          />

          <Tab
            label={STATEMENTS}
            value="/retirement/retired/statements"
            to={buildPath("/retirement/retired/statements")}
            component={Link}
          />

          <Tab
            label={PAYSLIP}
            value="/retirement/retired/slips"
            to={buildPath("/retirement/retired/slips")}
            component={Link}
          />

          <Tab
            label={REQUESTS}
            value="/retirement/retired/requests"
            to={buildPath("/retirement/retired/requests")}
            component={Link}
          />
        </Tabs>
      </Box>

      <Outlet />
    </div>
  );

  return content;
};
