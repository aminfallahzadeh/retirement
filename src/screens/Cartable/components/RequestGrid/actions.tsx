// IMPORTS
import { Box, IconButton, Tooltip, CircularProgress } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { RoleSelectionBox } from "../RoleSelectionBox";

export const topBarActionsProvider = ({
  isLoading,
  isFetching,
  handleRefresh,
}: {
  isLoading: boolean;
  isFetching: boolean;
  handleRefresh: () => void;
}) => (
  <Box
    sx={{
      display: "flex",
      gap: "0.5rem",
      alignItems: "center",
      justifyContent: "flex-end",
    }}
  >
    {isLoading || isFetching ? (
      <IconButton aria-label="refresh" color="info" disabled>
        <CircularProgress size={20} value={100} />
      </IconButton>
    ) : (
      <Tooltip title="بروز رسانی">
        <span>
          <IconButton aria-label="refresh" color="info" onClick={handleRefresh}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    )}

    <RoleSelectionBox />
  </Box>
);
