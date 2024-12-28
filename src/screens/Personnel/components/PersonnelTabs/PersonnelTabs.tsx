// IMPORTS
import { Box, Tab, Tabs } from "@mui/material";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import useRouteMatch from "@/hooks/useRouteMatch";
import { PERSONNEL_URL } from "@/constants/urls";
import { TARIFF, PERSONNEL_RETIRED_STATEMENTS_TAB_URL } from "@/constants/urls";
import {
  PERSONNEL_STATEMENTS,
  TARIFF as TARIFF_TITLE,
  RETIRED_STATEMENTS,
} from "@/constants/const";

export const PersonnelTabs = () => {
  // STATES
  const [searchParams] = useSearchParams();

  // CONSTS
  const routeMatch = useRouteMatch([
    `${PERSONNEL_URL}/${PERSONNEL_RETIRED_STATEMENTS_TAB_URL}`,
    `${PERSONNEL_URL}/${TARIFF}`,
    PERSONNEL_URL,
  ]);
  const queryParams = searchParams.toString();
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
            label={PERSONNEL_STATEMENTS}
            value={PERSONNEL_URL}
            to={buildPath(PERSONNEL_URL)}
            component={Link}
          />

          <Tab
            label={TARIFF_TITLE}
            value={`${PERSONNEL_URL}/${TARIFF}`}
            to={buildPath(`${PERSONNEL_URL}/${TARIFF}`)}
            component={Link}
          />

          <Tab
            label={RETIRED_STATEMENTS}
            value={`${PERSONNEL_URL}/${PERSONNEL_RETIRED_STATEMENTS_TAB_URL}`}
            to={buildPath(
              `${PERSONNEL_URL}/${PERSONNEL_RETIRED_STATEMENTS_TAB_URL}`
            )}
            component={Link}
          />
        </Tabs>
      </Box>

      <Outlet />
    </div>
  );

  return content;
};
