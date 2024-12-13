// IMPORTS
import { CustomModal } from "../CustomModal";
import { LoadingButton } from "@mui/lab";
import { YES, NO, DELETE } from "@/constants/const";
import { CONFIRM_DELETE } from "@/constants/messages";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import WarningIcon from "@mui/icons-material/InfoOutlined";
import { DeleteModalProps } from "./types";

export const DeleteModal = ({
  open,
  onClose,
  isLoading,
  handleRemove,
  title = DELETE,
  description = CONFIRM_DELETE,
}: DeleteModalProps) => (
  <CustomModal title={title} open={open} onClose={onClose}>
    <div className="flex gap-x-2 items-center justify-center m-5">
      <WarningIcon color="warning" fontSize="small" />
      <h5>{description}</h5>
    </div>

    <div className="flex-row flex-center">
      <LoadingButton
        dir="ltr"
        endIcon={<DoneIcon />}
        onClick={handleRemove}
        loading={isLoading}
        variant="contained"
        color="success"
      >
        <span>{YES}</span>
      </LoadingButton>

      <LoadingButton
        dir="ltr"
        endIcon={<CloseIcon />}
        onClick={onClose}
        loading={isLoading}
        variant="contained"
        color="error"
      >
        <span>{NO}</span>
      </LoadingButton>
    </div>
  </CustomModal>
);
