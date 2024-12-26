// IMPORTS
import { useState, useEffect } from "react";
import {
  useGetRequestQuery,
  useSendRequestToNextStateMutation,
} from "@/features/request/requestApi";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FieldView } from "@/shared/components/FieldView";
import { RequestInfoType, RequestConditionType } from "../../types";
import { Box, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import { CustomModal } from "@/shared/components/CustomModal";
import StateChangeForm from "../../forms/StateChangeForm";
import { toastConfig } from "@/config/toast";
import { CARTABLE_URL } from "@/constants/urls";
import {
  REQUEST_NO,
  FIRST_NAME,
  LAST_NAME,
  REQUEST_TYPE,
  REQUEST_INFO,
  DATE,
  SELECT_EXPERT,
} from "@/constants/const";

const RequestInfo = () => {
  // STATES
  const [searchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [data, setData] = useState<RequestInfoType | null>(null);
  const [conditionValue, setConditionValue] = useState<number | null>(null);
  const [condition, setCondition] = useState<RequestConditionType[] | null>(
    null
  );

  // CONSTS
  const Role = searchParams.get("Role");
  const navigate = useNavigate();
  const requestID = searchParams.get("requestID");
  const requestTypeID = searchParams.get("type");
  const {
    data: request,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetRequestQuery({ Role, requestID });
  const [sendRequest, { isLoading: isSending }] =
    useSendRequestToNextStateMutation();

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      setData(request?.itemList[0]);
      setCondition(request?.itemList[0].conditions);
    }
  }, [isSuccess, request]);

  const handleOpenStateChangeModal = async (
    state: number,
    conditionValue: number
  ) => {
    // console.log(state, conditionValue);
    setConditionValue(conditionValue);
    if (state !== 1000) {
      setOpenModal(true);
    } else {
      const response = await sendRequest({
        requestid: requestID,
        conditionValue,
        role: Role,
        requestTypeID,
      }).unwrap();

      toastConfig.success(response.message);
      navigate(CARTABLE_URL, { replace: true });
    }
  };

  // CONTENT
  const content = (
    <>
      <CustomModal
        title={SELECT_EXPERT}
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <StateChangeForm conditionValue={conditionValue as number} />
      </CustomModal>

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
        <section className="flex-col formContainer">
          <div className="grid grid-cols-3">
            <FieldView.Text value={data?.requestNO || "-"} label={REQUEST_NO} />
            <FieldView.Text
              value={convertToPersianDateFormatted(data?.requestDate) || "-"}
              label={DATE}
            />
            <FieldView.Text
              value={data?.personFirstName || "-"}
              label={FIRST_NAME}
            />
            <FieldView.Text
              value={data?.personLastName || "-"}
              label={LAST_NAME}
            />
            <FieldView.Text
              value={data?.requestTypeNameFa || "-"}
              label={REQUEST_TYPE}
            />
            <FieldView.TextArea
              value={data?.requestText || "-"}
              label={REQUEST_INFO}
              classNames="col-span-3 row-span-2"
            />
          </div>

          <div className="flex-row mr-auto">
            <LoadingButton
              dir="ltr"
              endIcon={<DownloadIcon />}
              variant="contained"
              color="primary"
            >
              <span>چاپ</span>
            </LoadingButton>

            {condition?.map((item) => (
              <LoadingButton
                dir="ltr"
                endIcon={<ChangeCircleOutlinedIcon />}
                variant="contained"
                loading={item.nextSate === 1000 ? isSending : false}
                onClick={() =>
                  handleOpenStateChangeModal(item.nextSate, item.conditionValue)
                }
                color="primary"
                key={item.buttonName}
              >
                <span>{item.buttonName}</span>
              </LoadingButton>
            ))}
          </div>
        </section>
      )}
    </>
  );
  return content;
};

export default RequestInfo;
