// IMPORTS
import { Box, IconButton, Tooltip, CircularProgress } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { RoleSelectionBox } from "../RoleSelectionBox";
import { RoleDataType } from "@/shared/types/role";

export const topBarActionsProvider = ({
  isLoading,
  isFetching,
  roles,
  handleRefresh,
}: {
  isLoading: boolean;
  isFetching: boolean;
  roles: RoleDataType["itemList"];
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

    <RoleSelectionBox isLoading={isLoading} roles={roles} />
  </Box>
);
