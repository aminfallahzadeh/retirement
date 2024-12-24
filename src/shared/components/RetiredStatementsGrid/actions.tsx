// IMPORTS
import { Box, IconButton, Tooltip, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CREATE_RELATED } from "@/constants/const";
import { Link } from "react-router-dom";
import { GENERATE_STATEMENT_URL } from "@/constants/urls";

export const statementsTopActionsProvider = (
  isLoading: boolean,
  isFetching: boolean,
  personID: string | null,
  requestID: string | null
) => (
  <Box>
    {isFetching || isLoading ? (
      <IconButton aria-label="refresh" color="info" disabled>
        <CircularProgress size={20} value={100} />
      </IconButton>
    ) : (
      <Tooltip title={CREATE_RELATED}>
        <Link
          to={`${GENERATE_STATEMENT_URL}?personID=${personID}&requestID=${requestID}`}
        >
          <AddIcon fontSize="small" color="success" />
        </Link>
      </Tooltip>
    )}
  </Box>
);
