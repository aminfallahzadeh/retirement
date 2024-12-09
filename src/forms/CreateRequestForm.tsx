// REACT IMPORTS
import { useEffect, useState, useCallback } from "react";

// RRD
import { useNavigate } from "react-router-dom";

// REDUX
import { useInsertRequestByNationalCodeMutation } from "@/features/request/requestApi";
import { useLazyGetRequestTypeQuery } from "@/features/request/requestApi";

import { useLazyGetRoleQuery } from "@/features/request/requestApi";

// MUI
import { LoadingButton } from "@mui/lab";
import { ArrowUpwardOutlined as SendIcon } from "@mui/icons-material";

// LIBRARIES
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// DATA
import { noNationalCodeRequestData } from "../data/noNationalCodeRequestData.js";

// UTILS
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "../utils/reactSelect.js";

// HELPERS
import { convertToPersianNumber, convertToEnglishNumber } from "@/helper";

function CreateRequestForm() {
  const [role, setRole] = useState(null);
  const [requestTypeOptions, setRequestTypeOptions] = useState([]);

  // ACCESS QUERIES
  const [getRoles, { isLoading: isRolesLoading, isFetching: isRolesFetching }] =
    useLazyGetRoleQuery();

  const [
    getRequestTypes,
    { isLoading: isRequestTypesLoading, isFetching: isRequestTypesFetching },
  ] = useLazyGetRequestTypeQuery();

  // FETCH LOGICS
  const fetchRoles = useCallback(async () => {
    try {
      const res = await getRoles().unwrap();
      setRole(res?.itemList[0].url);
    } catch (error) {
      console.log(error);
      const apiError = error;
      toast.error(apiError.data?.message || apiError.error, {
        autoClose: 2000,
      });
    }
  }, [getRoles]);

  const fetchRequestTypes = useCallback(async () => {
    try {
      console.log("ROLE BEFORE REQUEST:", role);
      const res = await getRequestTypes(role).unwrap();
      const data = optionsGenerator(res.itemList, "requestTypeID", "name");
      setRequestTypeOptions(data);
    } catch (error) {
      console.log(error);
      // const apiError = error;
      // toast.error(apiError.data?.message || apiError.error, {
      //   autoClose: 2000,
      // });
    }
  }, [getRequestTypes, role]);

  // SIDE EFFECTS
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    if (role) {
      console.log(role);
      fetchRequestTypes();
    }
  }, [role, fetchRequestTypes]);

  const [insertRequest, { isLoading: isInserting }] =
    useInsertRequestByNationalCodeMutation();

  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  // REQUEST OBJECT STATE
  const [requestObject, setRequestObject] = useState({});

  // HANDLE REQUEST OBJECT CHANGE
  const handleRequestObjectChange = (e) => {
    const { name, value } = e.target;
    setRequestObject({
      ...requestObject,
      [name]: value,
    });
  };

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      setRequestObject({ ...requestObject, [name]: value || "" });
    } else {
      setRequestObject({ ...requestObject, [name]: null });
    }
  };

  const handleInsertRequest = async () => {
    try {
      const nationalCode = requestObject?.nationalCode
        ? convertToEnglishNumber(requestObject.nationalCode)
        : "-1";
      const insertRes = await insertRequest({
        ...requestObject,
        requestFrom: 1,
        nationalCode,
      }).unwrap();
      navigate("/retirement/cartable");
      toast.success(insertRes.message, {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  const content = (
    <section className="formContainer flex-col">
      <form
        method="POST"
        className="grid grid--col-4 u-margin-top-md"
        noValidate
      >
        <div className="inputBox__form">
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={requestTypeOptions}
            onChange={handleSelectOptionChange}
            value={requestTypeOptions.find(
              (item) => item.value === requestObject?.requestTypeID
            )}
            name="requestTypeID"
            isClearable={true}
            placeholder={
              <div className="react-select-placeholder">
                <span>*</span> نوع درخواست
              </div>
            }
            noOptionsMessage={selectSettings.noOptionsMessage}
            loadingMessage={selectSettings.loadingMessage}
            styles={selectStyles}
            isLoading={isRequestTypesLoading || isRequestTypesFetching}
          />

          <label
            className={
              requestObject?.requestTypeID
                ? "inputBox__form--readOnly-label"
                : "inputBox__form--readOnly-label-hidden"
            }
          >
            <span>*</span> نوع درخواست
          </label>
        </div>

        {!noNationalCodeRequestData.includes(requestObject?.requestTypeID) && (
          <div className="inputBox__form">
            <input
              type="text"
              name="nationalCode"
              id="nationalCode"
              onChange={handleRequestObjectChange}
              className="inputBox__form--input"
              value={convertToPersianNumber(requestObject?.nationalCode) ?? ""}
              required
            />
            <label htmlFor="nationalCode" className="inputBox__form--label">
              <span>*</span> کد ملی
            </label>
          </div>
        )}

        <div className="inputBox__form col-span-4 row-span-3">
          <textarea
            type="text"
            id="requestText"
            name="requestText"
            onChange={handleRequestObjectChange}
            value={requestObject?.requestText || ""}
            className="inputBox__form--input"
            required
          ></textarea>
          <label htmlFor="requestText" className="inputBox__form--label">
            <span>*</span> متن درخواست
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }} className="flex-row">
        <LoadingButton
          dir="ltr"
          endIcon={<SendIcon />}
          variant="contained"
          onClick={handleInsertRequest}
          loading={isInserting}
          color="success"
        >
          <span>ارسال درخواست</span>
        </LoadingButton>
      </div>
    </section>
  );
  return content;
}

export default CreateRequestForm;
