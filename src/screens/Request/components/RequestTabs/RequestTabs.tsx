// IMPORTS
import { Box, Tab, Tabs } from "@mui/material";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import useRouteMatch from "@/hooks/useRouteMatch";
import { REQUEST_URL, ATTACHMENTS, HISTORY } from "@/constants/urls";
import {
  REQUEST,
  ATTACHMENTS as ATTACHMENTS_TITLE,
  HISTORY as HISTORY_TITLE,
} from "@/constants/const";

export const RequestTabs = () => {
  // STATES
  const [searchParams] = useSearchParams();

  // CONSTS
  const routeMatch = useRouteMatch([
    `${REQUEST_URL}/${HISTORY}`,
    `${REQUEST_URL}/${ATTACHMENTS}`,
    REQUEST_URL,
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
            label={REQUEST}
            value={REQUEST_URL}
            to={buildPath(REQUEST_URL)}
            component={Link}
          />

          <Tab
            label={ATTACHMENTS_TITLE}
            value={`${REQUEST_URL}/${ATTACHMENTS}`}
            to={buildPath(`${REQUEST_URL}/${ATTACHMENTS}`)}
            component={Link}
          />

          <Tab
            label={HISTORY_TITLE}
            value={`${REQUEST_URL}/${HISTORY}`}
            to={buildPath(`${REQUEST_URL}/${HISTORY}`)}
            component={Link}
          />
        </Tabs>
      </Box>

      <Outlet />
    </div>
  );

  return content;
};
