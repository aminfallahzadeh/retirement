// IMPORTS
import { InquiryResultFormProp } from "./types";
import { FieldView } from "@/shared/components/FieldView";
import { Box, CircularProgress } from "@mui/material";
import {
  FIRST_NAME,
  LAST_NAME,
  FATHER_NAME,
  CERTIFICATE_NO,
  MARITIAL_STATUS,
  LIVING_STATUS,
  CHILDREN_NO,
} from "@/constants/const";

const InquiryResultForm = ({
  isLoading,
  isFetching,
  data,
}: InquiryResultFormProp) => {
  // CONTENT
  const content = (
    <>
      {isLoading || isFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem 10rem",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <section className="flex-col formContainer mb-20">
          <div className="grid grid-cols-4">
            <FieldView.Text value={"-"} label={FIRST_NAME} />
            <FieldView.Text value={"-"} label={LAST_NAME} />
            <FieldView.Text value={"-"} label={FATHER_NAME} />
            <FieldView.Text value={"-"} label={CERTIFICATE_NO} />
            <FieldView.Text value={"-"} label={MARITIAL_STATUS} />
            <FieldView.Text value={"-"} label={LIVING_STATUS} />
            <FieldView.Text value={"-"} label={CHILDREN_NO} />
          </div>
        </section>
      )}
    </>
  );
  return content;
};

export default InquiryResultForm;
