// IMPORTS
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ADD_ITEM } from "@/constants/const";

export const topBarActionsProvider = ({
  fn,
  disabled,
}: {
  fn: () => void;
  disabled: boolean;
}) => (
  <Tooltip title={ADD_ITEM}>
    <span>
      <IconButton
        aria-label="refresh"
        color="success"
        onClick={fn}
        disabled={disabled}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </span>
  </Tooltip>
);
