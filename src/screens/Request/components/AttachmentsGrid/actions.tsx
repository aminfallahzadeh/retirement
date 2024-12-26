// IMPORTS
import { Box, IconButton, Tooltip, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { INSERT_ATTACHMENT } from "@/constants/const";

export const attachmentsActions = (
  isLoading: boolean,
  isFetching: boolean,
  addImageFn: () => void
) => (
  <Box>
    {isFetching || isLoading ? (
      <IconButton aria-label="refresh" color="info" disabled>
        <CircularProgress size={20} value={100} color={"success"} />
      </IconButton>
    ) : (
      <Tooltip title={INSERT_ATTACHMENT}>
        <span>
          <IconButton aria-label="refresh" color="success" onClick={addImageFn}>
            <AddIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    )}
  </Box>
);
