// IMPORTS
import { Box, IconButton, Tooltip, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CREATE_RELATED } from "@/constants/const";
import { Link } from "react-router-dom";

export const statementsTopActionsProvider = (
  isLoading: boolean,
  isFetching: boolean
  //   parentPersonID: string | null
) => (
  <Box>
    {isFetching || isLoading ? (
      <IconButton aria-label="refresh" color="info" disabled>
        <CircularProgress size={20} value={100} />
      </IconButton>
    ) : (
      <Tooltip title={CREATE_RELATED}>
        <IconButton aria-label="refresh" color="success">
          <AddIcon fontSize="small" />
        </IconButton>
        {/* <Link to={`${RELATED_URL}?mode=create&id=${parentPersonID}`}>
        </Link> */}
      </Tooltip>
    )}
  </Box>
);
