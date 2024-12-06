// IMPORTS
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tooltip, IconButton } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import PersonnelInfoForm from "@/forms/PersonnelInfoForm";
import PersonnelGridsSection from "@/sections/personnel/PersonnelGridsSection";
import { SuspenseFallback } from "@/shared/components/SuspenseFallback";

function PersonnelInfoScreen() {
  // CONSTS
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const personID = searchParams.get("personID");

  useEffect(() => {
    if (!personID) {
      navigate(-1);
    }
  }, [personID, navigate]);

  if (!personID) {
    return <SuspenseFallback />;
  }

  const content = (
    <section className="flex-col u-margin-bottom-md">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>اطلاعات کارمند
        </h4>
        <div style={{ marginRight: "auto" }} className="back-button">
          <Tooltip title="بازگشت">
            <span>
              <IconButton color="primary" onClick={() => navigate(-1)}>
                <BackIcon />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      </div>
      <PersonnelInfoForm />
      <PersonnelGridsSection />
    </section>
  );
  return content;
}

export default PersonnelInfoScreen;
