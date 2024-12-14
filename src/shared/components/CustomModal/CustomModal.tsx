// MUI
import { IconButton, Modal, Box, Stack, Typography } from "@mui/material";
import { CloseOutlined as CloseIcon } from "@mui/icons-material";
import { CustomModalProps } from "./types";

const styles = {
  container: {
    outline: "none",
    border: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    maxHeight: 800,
    minHeight: 200,
    overflow: "auto",
    bgcolor: "var(--color-bg-primary)",
    boxShadow: 24,
    borderRadius: 1,
    px: 4,
    py: 2,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    margin: "0 auto",
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
};

const fullScreenContainer = {
  container: {
    outline: "none",
    border: "none",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    overflow: "auto",
    bgcolor: "var(--color-bg-primary)",
    boxShadow: 24,
    borderRadius: 1,
    px: 4,
    py: 2,
  },
};

export const CustomModal = ({
  open,
  onClose,
  children,
  ariaLabel,
  ariaDescription,
  title,
  fullScreen = false,
}: CustomModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby={ariaLabel}
      aria-describedby={ariaDescription}
    >
      <Stack
        spacing={2}
        sx={fullScreen ? fullScreenContainer.container : styles.container}
      >
        <Box sx={styles.header}>
          {onClose && (
            <Box sx={styles.closeIcon}>
              <IconButton onClick={onClose} color="error">
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          <Typography
            id={ariaLabel}
            variant="h6"
            component="h2"
            sx={styles.title}
            className="title-secondary"
          >
            {title}
          </Typography>
        </Box>
        <Box>{children}</Box>
      </Stack>
    </Modal>
  );
};
