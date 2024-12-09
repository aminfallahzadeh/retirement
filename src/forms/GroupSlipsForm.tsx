// REACT IMPORTS
import { useState, useEffect, useCallback, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

// REDUX
import { useDispatch } from "react-redux";
import {
  useLazyExistPaySlipQuery,
  useLazyGetPayListQuery,
  useIssuePayMutation,
  useInsertPayMutation,
  useInsertPayExcelMutation,
} from "@/features/pay/payApi";
import { setSlipsTableData } from "@/slices/slipsDataSlice";

// MUI
import { LoadingButton } from "@mui/lab";
import {
  Box,
  CircularProgress,
  Button,
  Tooltip,
  IconButton,
  LinearProgress,
} from "@mui/material";
import {
  VisibilityOutlined as EyeIcon,
  ImportExportOutlined as ExportIcon,
  UploadOutlined as UploadIcon,
  Done as DoneIcon,
  DeleteOutline as RemoveIcon,
} from "@mui/icons-material";

// LIBRARIES
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import * as XLSX from "xlsx";

// COMPONENTS
import Modal from "@/components/Modal";

// HELPERS
import { convertToEnglishNumber } from "@/helper";

// UTILS
import { selectStyles, selectSettings } from "../utils/reactSelect";

// ASSETS
import excelImage from "@images/excel-icon.png";

// DATA
import {
  issueTypeOptions,
  payTypeOptions,
  currentYearOptions,
  currentMonthOptions,
} from "../data/groupSlipsData";

function GroupSlipsForm() {
  // EXCEL FILE UPLOAD REF
  const excelFileUploadRef = useRef(null);

  // EXCEL STATES
  const [uploadProgress, setUploadProgress] = useState(0);
  const [excelFile, setExcelFile] = useState(null);
  const [savedDataLength, setSavedDataLength] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);

  const [isSlipExists, setIsSlipExists] = useState(null);

  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();

  // ACCESS REACT HOOK FORM CONTROL
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm();

  // ACCESS REACT HOOK FORM DATA
  const form_data = watch();

  // ACCESS QUERIES
  const [
    insertExcel,
    { isLoading: isExcelLoading, isFetching: isExcelFetching },
  ] = useInsertPayExcelMutation();

  // ACCESS QUERIES
  const [existPaySlip, { isLoading: isChecking }] = useLazyExistPaySlipQuery();
  const [
    getPayList,
    { isLoading: isGettingPayList, isFetching: isFetchingPayList },
  ] = useLazyGetPayListQuery();

  const searchParams = new URLSearchParams(location.search);
  const requestID = searchParams.get("requestID");
  const personID = searchParams.get("personID");

  const [issuePay, { isLoading: isIssuing }] = useIssuePayMutation();
  const [insertPay, { isLoading: isInserting }] = useInsertPayMutation();

  // SLIP CHECKER FUNCTION
  const slipChecker = useCallback(
    async ({ payType, currentYear, currentMonth }) => {
      try {
        const res = await existPaySlip({
          payType,
          currentYear: parseInt(currentYear),
          currentMonth: parseInt(currentMonth),
        }).unwrap();
        setIsSlipExists(res);
      } catch (err) {
        console.log(err);
      }
    },
    [existPaySlip]
  );

  // CHECK SLIP EXISTENCE ON USER DATA ENTER
  useEffect(() => {
    if (form_data.payType && form_data.currentYear && form_data.currentMonth) {
      slipChecker({
        payType: form_data.payType,
        currentYear: form_data.currentYear,
        currentMonth: form_data.currentMonth,
      });
    }
  }, [
    slipChecker,
    form_data.payType,
    form_data.currentYear,
    form_data.currentMonth,
  ]);

  // GET PAY LST HANDLER
  const getPayListHandler = async () => {
    if (form_data.issueType === "2") {
      try {
        const res = await getPayList({
          currentYear: parseInt(form_data.currentYear),
          currentMonth: parseInt(form_data.currentMonth),
          payType: form_data.payType,
          personID,
        }).unwrap();
        const mappedData = res.itemList.map((item, index) => ({
          id: item.payID,
          rowNum: index + 1,
          personID: item.personID,
          payFirstName: item.payFirstName,
          payLastName: item.payLastName,
          accountNo: item.accountNo,
          payDebitAmount: item.payDebitAmount,
          payCreditAmount: item.payCreditAmount,
          payAmount: item.payAmount,
          payDate: item.payDate,
        }));
        dispatch(setSlipsTableData(mappedData));
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    } else {
      try {
        const res = await getPayList({
          currentYear: parseInt(form_data.currentYear),
          currentMonth: parseInt(form_data.currentMonth),
          payType: form_data.payType,
        }).unwrap();
        const mappedData = res.itemList.map((item, index) => ({
          id: item.payID,
          rowNum: index + 1,
          payFirstName: item.payFirstName,
          payLastName: item.payLastName,
          accountNo: item.accountNo,
          payDebitAmount: item.payDebitAmount,
          payCreditAmount: item.payCreditAmount,
          payAmount: item.payAmount,
          payDate: item.payDate,
        }));
        dispatch(setSlipsTableData(mappedData));
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    }
  };

  // REMOVE TABLE DATA ON ITEM CHANGE OR COMPONENT DISMOUNT
  useEffect(() => {
    dispatch(setSlipsTableData([]));
  }, [
    dispatch,
    form_data.issueType,
    form_data.currentYear,
    form_data.currentMonth,
    form_data.payType,
  ]);

  // SET ISSUE TYPE BASED ON REQUEST TYPE
  useEffect(() => {
    setValue("payType", "M");
    if (personID) {
      setValue("issueType", "2");
    } else {
      setValue("issueType", "1");
    }
  }, [personID, setValue]);

  // ON SUBMIT HADNLER
  const onSubmit = async () => {
    if (form_data.issueType === "2") {
      try {
        const date = new Date();
        const res = await insertPay({
          payDate: date.toISOString(),
          currentYear: parseInt(form_data.currentYear),
          currentMonth: parseInt(form_data.currentMonth),
          requestID,
          personID,
        }).unwrap();
        setIsSlipExists(true);
        toast.success(res.message, {
          autoClose: 2000,
        });
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    } else {
      try {
        const date = new Date();
        const res = await issuePay({
          currentYear: parseInt(form_data.currentYear),
          currentMonth: parseInt(form_data.currentMonth),
          requestID,
          payDate: date.toISOString(),
        }).unwrap();
        setIsSlipExists(true);
        getPayListHandler();
        toast.success(res.message, {
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

  const handleInsertExcel = async (data, type) => {
    console.log(type);
    try {
      const res = await insertExcel({ data, type }).unwrap();
      setShowResultModal(true);
      toast.success(res.message, {
        autoClose: 2000,
      });
    } catch (err) {
      // if (err?.data?.error === "period exists") {
      //   toast.error("دوره تکراری می باشد", {
      //     autoClose: 2000,
      //   });
      // } else if (err?.data?.error === "PersonnelID not found") {
      //   toast.error("شماره کارمندی یافت نشد", {
      //     autoClose: 2000,
      //   });
      // } else {
      //   toast.error(err?.data?.message || err.error, {
      //     autoClose: 2000,
      //   });
      // }

      console.log(err?.data.error);
    }
  };

  const handleExcelFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      setExcelFile(file);

      // Event handler for progress
      reader.onprogress = (event) => {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      };

      reader.onload = (event) => {
        const excel = new Uint8Array(event.target.result);
        const workbook = XLSX.read(excel, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // EXTRACT HEADERS AND ROWS
        const headers = json[0];
        const rows = json.slice(1);

        // CREATE DATA OBJECT
        const items = rows
          .map((row) => {
            if (
              row.every(
                (cell) => cell === null || cell === undefined || cell === ""
              )
            ) {
              return null;
            }
            const obj = {};
            row.forEach((cell, index) => {
              obj[headers[index]] = convertToEnglishNumber(
                cell ? cell.toString() : ""
              );
            });

            return obj;
          })
          .filter((item) => item !== null);

        const type = form_data?.payType;
        setSavedDataLength(items.length);
        handleInsertExcel(items, type);
      };

      reader.onloadend = () => {
        setTimeout(() => {
          setUploadProgress(0);
        }, 2000);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExcelFileUpload = () => {
    excelFileUploadRef.current.click();
  };

  const handleRemoveExcelFile = () => {
    setExcelFile(null);
    setUploadProgress(0);
  };

  const handleCloseModal = () => {
    setShowResultModal(false);
    setExcelFile(null);
    setUploadProgress(0);
  };

  const content = (
    <>
      {showResultModal && (
        <Modal title={"نتیجه"}>
          <p className="paragraph-primary">
            تعداد {savedDataLength} رکورد ثبت شد
          </p>

          <div className="flex-row flex-center">
            <Button
              dir="ltr"
              endIcon={<DoneIcon />}
              onClick={handleCloseModal}
              variant="contained"
              color="success"
            >
              <span>تایید</span>
            </Button>
          </div>
        </Modal>
      )}
      {isGettingPayList || isFetchingPayList ? (
        <Modal title={"در حال بارگیری"}>
          <p className="paragraph-primary" style={{ textAlign: "center" }}>
            لطفا منتظر بمانید...
          </p>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "2rem 10rem",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        </Modal>
      ) : null}
      <section className="formContainer flex-col">
        <form
          method="POST"
          className="flex-col"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid--col-4">
            <div className="inputBox__form">
              <Controller
                name="issueType"
                control={control}
                render={({ field: { onChange } }) => (
                  <Select
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={issueTypeOptions}
                    onChange={(val) => onChange(val ? val.value : null)}
                    value={issueTypeOptions.find(
                      (c) => c.value === form_data?.issueType
                    )}
                    isClearable={true}
                    isDisabled={true}
                    placeholder={
                      <div className="react-select-placeholder">
                        <span>*</span> نوع صدور
                      </div>
                    }
                    noOptionsMessage={selectSettings.noOptionsMessage}
                    loadingMessage={selectSettings.loadingMessage}
                    styles={selectStyles}
                  />
                )}
              />

              <label
                className={
                  form_data?.issueType
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                <span>*</span> نوع صدور
              </label>
            </div>

            <div className="inputBox__form">
              <Controller
                name="payType"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={payTypeOptions}
                    onChange={(val) => onChange(val ? val.value : null)}
                    value={payTypeOptions.find((c) => c.value === value)}
                    isClearable={true}
                    placeholder={
                      <div className="react-select-placeholder">
                        <span>*</span> نوع فیش
                      </div>
                    }
                    noOptionsMessage={selectSettings.noOptionsMessage}
                    loadingMessage={selectSettings.loadingMessage}
                    styles={selectStyles}
                  />
                )}
              />

              <label
                className={
                  form_data?.payType
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                <span>*</span> نوع فیش
              </label>

              {errors.payType && (
                <span className="error-form">نوع فیش اجباری است</span>
              )}
            </div>

            <div className="inputBox__form">
              <Controller
                name="currentYear"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={currentYearOptions}
                    onChange={(val) => onChange(val ? val.value : null)}
                    value={currentYearOptions.find((c) => c.value === value)}
                    isClearable={true}
                    placeholder={
                      <div className="react-select-placeholder">
                        <span>*</span> سال مالی
                      </div>
                    }
                    noOptionsMessage={selectSettings.noOptionsMessage}
                    loadingMessage={selectSettings.loadingMessage}
                    styles={selectStyles}
                  />
                )}
              />

              <label
                className={
                  form_data?.currentYear
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                <span>*</span> سال مالی
              </label>

              {errors.currentYear && (
                <span className="error-form">سال مالی اجباری است</span>
              )}
            </div>

            <div className="inputBox__form">
              <Controller
                name="currentMonth"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={currentMonthOptions}
                    isClearable={true}
                    onChange={(val) => onChange(val ? val.value : null)}
                    value={currentMonthOptions.find((c) => c.value === value)}
                    placeholder={
                      <div className="react-select-placeholder">
                        <span>*</span> ماه
                      </div>
                    }
                    noOptionsMessage={selectSettings.noOptionsMessage}
                    loadingMessage={selectSettings.loadingMessage}
                    styles={selectStyles}
                  />
                )}
              />

              <label
                className={
                  form_data?.currentMonth
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                <span>*</span> ماه
              </label>

              {errors.currentMonth && (
                <span className="error-form">ماه اجباری است</span>
              )}
            </div>
          </div>
          <div style={{ marginRight: "auto" }} className="flex-row flex-center">
            {isSlipExists === true && (
              <LoadingButton
                dir="ltr"
                endIcon={<EyeIcon />}
                loading={isChecking || isGettingPayList}
                onClick={getPayListHandler}
                variant="contained"
                color="primary"
              >
                <span>مشاهده</span>
              </LoadingButton>
            )}

            {form_data.payType === "C" || form_data.payType === "E" ? (
              <div style={{ position: "relative" }}>
                <LoadingButton
                  dir="ltr"
                  variant="contained"
                  color="warning"
                  //  disabled={
                  //    uploadProgress > 0 || excelFile
                  //      ? true
                  //      : false || !data.fractionTypeID
                  //  }

                  endIcon={<UploadIcon />}
                  loading={isExcelLoading || isExcelFetching}
                  onClick={handleExcelFileUpload}
                >
                  <span>بارگزاری اکسل</span>
                </LoadingButton>

                {excelFile && (
                  <div
                    className="excel"
                    style={{
                      position: "absolute",
                      bnottom: "-100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "100%",
                    }}
                  >
                    <IconButton
                      color="error"
                      size="small"
                      onClick={handleRemoveExcelFile}
                      sx={{ padding: 0 }}
                    >
                      <RemoveIcon fontSize="10px" />
                    </IconButton>
                    <Tooltip title={excelFile.name}>
                      <span className="excel__name">{excelFile.name}</span>
                    </Tooltip>
                    <img
                      src={excelImage}
                      className="excel__image"
                      style={{ width: "13px" }}
                    />
                  </div>
                )}

                <Box
                  sx={{
                    position: "absolute",
                    left: "50%",
                    bottom: "-35px",
                    zIndex: 2,
                    width: "90%",
                    transform: "translateX(-50%)",
                    visibility: uploadProgress > 0 ? "visible" : "hidden",
                  }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    color="warning"
                    sx={{ borderRadius: "40px" }}
                  />

                  <span style={{ fontFamily: "IranYekan", fontSize: "8px" }}>
                    {uploadProgress}%
                  </span>
                </Box>
              </div>
            ) : null}
            <LoadingButton
              dir="ltr"
              endIcon={<ExportIcon />}
              type="submit"
              loading={isChecking || isInserting || isIssuing}
              onClick={handleSubmit}
              variant="contained"
              color="warning"
              disabled={
                isSlipExists || form_data.payType === "" || !form_data.payType
                  ? true
                  : false
              }
            >
              <span>صدور</span>
            </LoadingButton>

            <input
              type="file"
              ref={excelFileUploadRef}
              style={{ display: "none" }}
              onChange={handleExcelFileChange}
              accept=".xlsx, .xls"
            />
          </div>
        </form>
      </section>
    </>
  );

  return content;
}

export default GroupSlipsForm;
