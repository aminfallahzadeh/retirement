// IMPORTS
import { Box, IconButton, Tooltip, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { REFRESH, CREATE_RELATED } from "@/constants/const";
import { HEIR_URL } from "@/constants/urls";
import { Link } from "react-router-dom";

export const heirGridTopActionsProvider = (
  isLoading: boolean,
  isFetching: boolean,
  refreshFn: () => void,
  parentPersonID: string | null
) => (
  <Box>
    {isFetching || isLoading ? (
      <IconButton aria-label="refresh" color="info" disabled>
        <CircularProgress size={20} value={100} />
      </IconButton>
    ) : (
      <Tooltip title={REFRESH}>
        <span>
          <IconButton aria-label="refresh" color="info" onClick={refreshFn}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    )}

    {isFetching || isLoading ? (
      <IconButton aria-label="refresh" color="info" disabled>
        <CircularProgress size={20} value={100} />
      </IconButton>
    ) : (
      <Tooltip title={CREATE_RELATED}>
        <Link to={`${HEIR_URL}?mode=create&id=${parentPersonID}`}>
          <IconButton aria-label="refresh" color="success">
            <AddIcon fontSize="small" />
          </IconButton>
        </Link>
      </Tooltip>
    )}
  </Box>
);
