// IMPORTS
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import { NAVIGATE_BACK } from "@/constants/const";

export const Title = ({
  title,
  back = false,
}: {
  title: string;
  back: boolean;
}) => {
  const navigate = useNavigate();

  const content = (
    <div className="title-primary--container flex-row flex-center">
      <h4 className="title-primary">
        <span className="title-primary--underline">{title}</span>
      </h4>

      {back && (
        <div className="back-button mr-auto">
          <Tooltip title={NAVIGATE_BACK}>
            <span>
              <IconButton color="primary" onClick={() => navigate(-1)}>
                <BackIcon />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      )}
    </div>
  );

  return content;
};
