// IMPORTS
import { Box, Tab, Tabs } from "@mui/material";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import useRouteMatch from "@/hooks/useRouteMatch";
import { useAppSelector } from "@/hooks/usePreTypesHooks";
import { RETIRED_URL, STATEMENTS, SLIPS, REQUESTS } from "@/constants/urls";
import {
  RELATED_GROUP,
  HEIR_GROUP,
  STATEMENTS as STATEMENTS_TITLE,
  PAYSLIP,
  REQUESTS as REQUESTS_TITLE,
} from "@/constants/const";

export const RetiredTabs = () => {
  // STATES
  const [searchParams] = useSearchParams();

  // CONSTS
  const routeMatch = useRouteMatch([
    `${RETIRED_URL}/${STATEMENTS}`,
    `${RETIRED_URL}/${REQUESTS}`,
    `${RETIRED_URL}/${SLIPS}`,
    RETIRED_URL,
  ]);
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
            value={RETIRED_URL}
            to={buildPath(RETIRED_URL)}
            component={Link}
          />

          <Tab
            label={STATEMENTS_TITLE}
            value={`${RETIRED_URL}/${STATEMENTS}`}
            to={buildPath(`${RETIRED_URL}/${STATEMENTS}`)}
            component={Link}
          />

          <Tab
            label={PAYSLIP}
            value={`${RETIRED_URL}/${SLIPS}`}
            to={buildPath(`${RETIRED_URL}/${SLIPS}`)}
            component={Link}
          />

          <Tab
            label={REQUESTS_TITLE}
            value={`${RETIRED_URL}/${REQUESTS}`}
            to={buildPath(`${RETIRED_URL}/${REQUESTS}`)}
            component={Link}
          />
        </Tabs>
      </Box>

      <Outlet />
    </div>
  );

  return content;
};
