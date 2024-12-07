// IMPORTS
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {
  ArrowBack as BackIcon,
  HomeOutlined as HomeIcon,
} from "@mui/icons-material";
import errorImage from "@images/404.png";

export const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="errorContainer">
      <div className="errorContainer__message">
        <img src={errorImage} />
        <h1>صفحه مورد نظر یافت نشد!</h1>
      </div>

      <div className="errorContainer__buttons u-margin-top-md">
        <Button
          dir="ltr"
          endIcon={<HomeIcon />}
          onClick={() => navigate("/retirement/cartable")}
          variant="contained"
          color="primary"
          sx={{ fontFamily: "sahel" }}
        >
          <span>کارتابل</span>
        </Button>

        <Button
          dir="ltr"
          endIcon={<BackIcon />}
          onClick={() => navigate(-1)}
          variant="contained"
          color="warning"
          sx={{ fontFamily: "sahel" }}
        >
          <span>بازگشت</span>
        </Button>
      </div>
    </div>
  );
};
