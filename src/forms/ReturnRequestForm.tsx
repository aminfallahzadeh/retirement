// react imports
import { useState, useEffect } from "react";

// RRD
import { useNavigate } from "react-router-dom";

// REDUX
import {
  useGetExpertQuery,
  useSendRequestToNextStateMutation,
} from "@/features/request/requestApi";

// MUI
import { CircularProgress, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Done as DoneIcon } from "@mui/icons-material";

// LIBRARIES
import { toast } from "react-toastify";

function ReturnRequestForm({ setShowModal, value }) {
  const [selectedExpert, setSelectedExpert] = useState(" ");
  const [description, setDescription] = useState("");
  const [expertCombo, setExpertCombo] = useState([]);

  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const RequestID = searchParams.get("requestID");
  const Role = searchParams.get("Role");
  const requestTypeID = searchParams.get("type");

  const [sendRequestToNextState, { isLoading: isSendLoading }] =
    useSendRequestToNextStateMutation();

  // HANDLE EXPERT COMBO ITEMS
  const {
    data: experts,
    isSuccess,
    isLoading,
    isFetching,
    error,
  } = useGetExpertQuery({ RequestID, conditionValue: value, Role });

  useEffect(() => {
    if (isSuccess) {
      setExpertCombo(experts.itemList);
    }
  }, [isSuccess, experts]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // CHANGE HANDLERS
  const handleSelectedExpertChange = (e) => {
    setSelectedExpert(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // RETURN REQUEST HANDLER
  const handleReturnRequest = async () => {
    try {
      const sendRes = await sendRequestToNextState({
        requestid: RequestID,
        conditionValue: value,
        expertUserID: selectedExpert,
        role: Role,
        requestTypeID,
        description,
      });
      setShowModal(false);
      toast.success(sendRes.data.message, {
        autoClose: 2000,
      });
      navigate("/retirement/cartable");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
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
          <form method="POST" className="flex-col" noValidate>
            <div className="flex-col">
              <div className="inputBox__form">
                <select
                  className="inputBox__form--input"
                  required
                  id="expertList"
                  onChange={handleSelectedExpertChange}
                  value={selectedExpert}
                  disabled={isSendLoading}
                  style={{ height: "40px", width: "180px" }}
                >
                  <option value=" " disabled>
                    انتخاب کنید
                  </option>

                  {expertCombo?.map((expert) => (
                    <option key={expert.userID} value={expert.userID}>
                      {expert.firstName} {expert.lastName}
                    </option>
                  ))}
                </select>

                <label className="inputBox__form--label" htmlFor="expertList">
                  لیست کارشناسان
                </label>
              </div>

              <div></div>

              <div className="inputBox__form">
                <textarea
                  className="inputBox__form--input"
                  required
                  id="expertDescription"
                  onChange={handleDescriptionChange}
                  value={description}
                  disabled={isSendLoading}
                  style={{ overflow: "hidden", width: "400px" }}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="expertDescription"
                >
                  توضیحات
                </label>
              </div>
            </div>

            <div style={{ marginRight: "auto" }}>
              <LoadingButton
                dir="ltr"
                loading={isLoading}
                endIcon={<DoneIcon />}
                onClick={handleReturnRequest}
                disabled={selectedExpert === " " || isSendLoading}
                variant="contained"
                color="success"
              >
                <span>تایید</span>
              </LoadingButton>
            </div>
          </form>
        </section>
      )}
    </>
  );

  return content;
}

export default ReturnRequestForm;
