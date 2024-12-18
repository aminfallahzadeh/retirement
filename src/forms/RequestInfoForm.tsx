// REACT IMPORTS
import { useState, useEffect } from "react";

// RRD
import { useNavigate } from "react-router-dom";

// REDUX
import {
  useGetRequestQuery,
  useSendRequestToNextStateMutation,
} from "@/features/request/requestApi";

// MUI
import { Box, CircularProgress, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  ArrowUpwardOutlined as SendIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
// library imports
import { toast } from "react-toastify";

// COMPONETNS
import Modal from "@/components/Modal";
import ReturnRequestForm from "@/forms/ReturnRequestForm";

// HELPERS
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper";

function RequestInfoForm() {
  // MODAL STATES
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState(null);

  // REQUEST CONDTIONS STATE
  const [requestCondition, setRequestCondition] = useState(null);

  const [requestData, setRequestData] = useState(null);

  const searchParams = new URLSearchParams(location.search);
  const Role = searchParams.get("Role");
  const requestID = searchParams.get("requestID");
  const requestTypeID = searchParams.get("type");

  const [sendRequestToNextState, { isLoading: isSendLoading }] =
    useSendRequestToNextStateMutation();

  const navigate = useNavigate();

  const {
    data: request,
    isSuccess,
    isLoading,
    isFetching,
    error,
  } = useGetRequestQuery({ Role, requestID });

  useEffect(() => {
    if (isSuccess) {
      setRequestData(request?.itemList[0]);
      setRequestCondition(request?.itemList[0].conditions);
    }
  }, [isSuccess, request?.itemList, setRequestCondition]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // HANDLERS
  const handleShowModalChange = async (value, state) => {
    console.log(value, state);
    setValue(value);
    if (state !== 1000) {
      setShowModal(true);
    } else {
      try {
        const sendRes = await sendRequestToNextState({
          requestid: requestID,
          conditionValue: value,
          role: Role,
          requestTypeID,
        });
        navigate("/retirement/cartable");
        toast.success(sendRes.data.message, {
          autoClose: 2000,
        });
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    }
  };

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
        <section className="formContainer flex-col">
          <form method="POST" className="grid grid--col-5">
            <div className="inputBox__form">
              <input
                type="text"
                id="requNO"
                disabled
                value={convertToPersianNumber(requestData?.requestNO) || "-"}
                className="inputBox__form--input"
                required
              />
              <label htmlFor="reqNum" className="inputBox__form--label">
                شماره درخواست
              </label>
            </div>
            <div className="inputBox__form">
              <input
                type="text"
                id="reqDate"
                disabled
                value={convertToPersianDateFormatted(requestData?.requestDate)}
                className="inputBox__form--input"
                required
              />
              <label htmlFor="reqdate" className="inputBox__form--label">
                تاریخ
              </label>
            </div>
            <div className="inputBox__form">
              <input
                type="text"
                id="reqFirstName"
                disabled
                value={requestData?.personFirstName || "-"}
                className="inputBox__form--input"
                required
              />
              <label htmlFor="rqName" className="inputBox__form--label">
                نام
              </label>
            </div>
            <div className="inputBox__form">
              <input
                type="text"
                id="reqLastName"
                disabled
                value={requestData?.personLastName || "-"}
                className="inputBox__form--input"
                required
              />
              <label htmlFor="rqfName" className="inputBox__form--label">
                نام خانوادگی
              </label>
            </div>

            <div className="inputBox__form">
              <input
                type="text"
                id="reqType"
                value={requestData?.requestTypeNameFa || "-"}
                disabled
                className="inputBox__form--input"
                required
              />
              <label htmlFor="rqType" className="inputBox__form--label">
                نوع درخواست
              </label>
            </div>
            <div className="inputBox__form col-span-5 row-span-3">
              <textarea
                disabled
                type="text"
                id="reqText"
                value={requestData?.requestText || "-"}
                className="inputBox__form--input"
                required
              ></textarea>
              <label htmlFor="reqText" className="inputBox__form--label">
                متن درخواست
              </label>
            </div>
          </form>

          <div style={{ marginRight: "auto" }} className="flex-row">
            <Button
              dir="ltr"
              endIcon={<PrintIcon />}
              variant="contained"
              color="primary"
              sx={{ fontFamily: "Vazir" }}
            >
              <span>چاپ</span>
            </Button>

            {requestCondition?.map((item) => (
              <LoadingButton
                dir="ltr"
                endIcon={<SendIcon />}
                variant="contained"
                loading={item.nextSate === 1000 ? isSendLoading : false}
                onClick={() =>
                  handleShowModalChange(item.conditionValue, item.nextSate)
                }
                color="primary"
                sx={{ fontFamily: "IranYekan" }}
                key={item.buttonName}
              >
                <span>{item.buttonName}</span>
              </LoadingButton>
            ))}
          </div>
        </section>
      )}
      {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          <div className="flex-row flex-center">
            <p className="paragraph-primary">کارشناس مورد نظر را انتخاب کنید</p>
          </div>

          <ReturnRequestForm setShowModal={setShowModal} value={value} />
        </Modal>
      )}
    </>
  );

  return content;
}

export default RequestInfoForm;
