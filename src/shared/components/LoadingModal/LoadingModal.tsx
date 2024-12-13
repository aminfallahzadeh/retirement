// IMPORTS
import { CustomModal } from "../CustomModal";
import { LoadingModalProps } from "./types";
import { LOADING_MESSAGE, WAITING_MESSAGE } from "@/constants/messages";
import { CircularProgress, Box } from "@mui/material";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";

export const LoadingModal = ({
  open,
  title = LOADING_MESSAGE,
  description = WAITING_MESSAGE,
}: LoadingModalProps) => {
  return (
    <CustomModal open={open} title={title}>
      <div className="flex gap-x-2 items-center justify-center m-5">
        <HourglassEmptyOutlinedIcon color="primary" fontSize="small" />
        <h5 className="text-gray-400">{description}</h5>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "2rem 10rem",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    </CustomModal>
  );
};
