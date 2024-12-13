// IMPORTS
import { useEffect, useState, useCallback, useRef, ChangeEvent } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { SlipsGrid } from "../components/SlipsGrid";
import { LinearProgress, Box, Tooltip, IconButton } from "@mui/material";
import { SelectInput } from "@/shared/components/SelectInput";
import { LoadingButton } from "@mui/lab";
import ExportIcon from "@mui/icons-material/ImportExportOutlined";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import RemoveIcon from "@mui/icons-material/DeleteOutline";
import UploadIcon from "@mui/icons-material/UploadOutlined";
import DoneIcon from "@mui/icons-material/Done";
import { CustomModal } from "@/shared/components/CustomModal";
import { LoadingModal } from "@/shared/components/LoadingModal";
import { Slip } from "../types";
import * as XLSX from "xlsx";
import { toastConfig } from "@/config/toast";
import { convertToEnglishNumber } from "@/helpers/numberConverter";
import images from "@/constants/images";
import {
  useLazyExistPaySlipQuery,
  useLazyGetPayListQuery,
  useIssuePayMutation,
  useInsertPayMutation,
  useInsertPayExcelMutation,
} from "@/features/pay/payApi";
import {
  ISSUE_TYPE,
  PAY_TYPE,
  PAY_YEAR,
  PAY_MONTH,
  ISSUE,
  OBSERVE,
  UPLOAD_EXCEL,
  RESULT,
  CONFIRM,
} from "@/constants/const";
import { requiredRule } from "@/constants/rules";
import {
  issueTypeOptions,
  payTypeOptions,
  currentYearOptions,
  currentMonthOptions,
} from "@/constants/options";

export const SlipsForm = () => {
  // STATES
  const excelFileUploadRef = useRef<HTMLInputElement | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [savedDataLength, setSavedDataLength] = useState(0);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isSlipExists, setIsSlipExists] = useState<boolean>(false);
  const [data, setData] = useState<Slip[]>([]);
  const [searchParams] = useSearchParams();

  // CONSTS
  const personID = searchParams.get("personID");
  const requestID = searchParams.get("requestID");
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      issueType: personID ? issueTypeOptions[1] : issueTypeOptions[0],
      payType: payTypeOptions[0],
    },
  });
  const form_data = watch();
  const [
    existPaySlip,
    { isLoading: isExistLoading, isFetching: isExistFetching },
  ] = useLazyExistPaySlipQuery();
  const [
    getPayList,
    { isLoading: isGettingPayList, isFetching: isFetchingPayList },
  ] = useLazyGetPayListQuery();
  const [issuePay, { isLoading: isIssuing }] = useIssuePayMutation();
  const [insertPay, { isLoading: isInserting }] = useInsertPayMutation();
  const [insertExcel, { isLoading: isExcelLoading }] =
    useInsertPayExcelMutation();

  // HANDLERS
  const handleExcelFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      setExcelFile(file);

      // Event handler for progress
      reader.onprogress = (event) => {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      };

      reader.onload = (event) => {
        const result = event.target?.result;
        if (
          result &&
          typeof result !== "string" &&
          result instanceof ArrayBuffer
        ) {
          const excel = new Uint8Array(result);
          const workbook = XLSX.read(excel, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // EXTRACT HEADERS AND ROWS
          const headers = json[0] as string;
          const rows = json.slice(1);

          // CREATE DATA OBJECT
          const items = rows
            .map((row: any[]) => {
              if (
                row.every(
                  (cell) => cell === null || cell === undefined || cell === ""
                )
              ) {
                return null;
              }
              const obj: Record<string, string> = {};
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
        } else {
          console.error("FileReader result is not a valid ArrayBuffer.");
        }
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
    excelFileUploadRef.current?.click();
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

  const handleInsertExcel = async (data: any, type: string) => {
    console.log(type);
    const res = await insertExcel({ data, type }).unwrap();
    setShowResultModal(true);
    toastConfig.success(res.message);
  };

  const onSubmit = async (data: FieldValues) => {
    if (isSlipExists) {
      const response = await getPayList({
        currentYear: parseInt(data.currentYear.value),
        currentMonth: parseInt(data.currentMonth.value),
        payType: data.payType.value,
        personID,
      }).unwrap();
      const mappedData = response.itemList.map((item: Slip, index: number) => ({
        id: item.payID,
        slipRowNum: index + 1,
        personID: item.personID,
        slipFirstName: item.payFirstName,
        slipLastName: item.payLastName,
        slipAccountNo: item.accountNo,
        slipPayDebitAmount: item.payDebitAmount,
        slipPayCreditAmount: item.payCreditAmount,
        slipPayAmount: item.payAmount,
        slipPayDate: item.payDate,
      }));
      setData(mappedData);
    } else if (data.issueType.value === "2") {
      const date = new Date();
      const response = await insertPay({
        payDate: date.toISOString(),
        currentYear: parseInt(data.currentYear.value),
        currentMonth: parseInt(data.currentMonth.value),
        requestID,
        personID,
      }).unwrap();
      setIsSlipExists(true);
      toastConfig.success(response.message);
    } else if (data.issueType.value === "1") {
      const date = new Date();
      const response = await issuePay({
        currentYear: parseInt(data.currentYear.value),
        currentMonth: parseInt(data.currentMonth.value),
        requestID,
        payDate: date.toISOString(),
      }).unwrap();
      setIsSlipExists(true);
      //   getPayListHandler();
      toastConfig.success(response.message);
    }
  };

  const slipChecker = useCallback(
    async ({
      payType,
      currentYear,
      currentMonth,
    }: {
      payType: string;
      currentYear: string;
      currentMonth: string;
    }) => {
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

  useEffect(() => {
    if (form_data.payType && form_data.currentYear && form_data.currentMonth) {
      slipChecker({
        payType: form_data.payType.value,
        currentYear: form_data.currentYear.value,
        currentMonth: form_data.currentMonth.value,
      });
    }
  }, [
    slipChecker,
    form_data.payType,
    form_data.currentYear,
    form_data.currentMonth,
  ]);

  // DEBUG
  useEffect(() => {
    console.log(form_data);
  }, [form_data]);
  const content = (
    <>
      <LoadingModal open={isGettingPayList || isInserting} />

      <CustomModal
        open={showResultModal}
        onClose={() => setShowResultModal(false)}
        title={RESULT}
      >
        <p className="paragraph-primary">
          تعداد {savedDataLength} رکورد ثبت شد
        </p>

        <div className="flex-row flex-center">
          <LoadingButton
            dir="ltr"
            endIcon={<DoneIcon />}
            onClick={handleCloseModal}
            variant="contained"
            color="success"
          >
            <span>{CONFIRM}</span>
          </LoadingButton>
        </div>
      </CustomModal>

      <section className="flex-col formContainer">
        <form
          method="POST"
          className="flex-col"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Form Fields */}
          <div className="grid grid-cols-4">
            <SelectInput
              name="issueType"
              control={control}
              label={ISSUE_TYPE}
              options={issueTypeOptions}
              required={false}
              isClearable={false}
              isDisabled={true}
              errors={errors}
            />

            <SelectInput
              name="payType"
              control={control}
              label={PAY_TYPE}
              options={payTypeOptions}
              required={true}
              isClearable={false}
              errors={errors}
            />

            <SelectInput
              name="currentYear"
              control={control}
              label={PAY_YEAR}
              options={currentYearOptions}
              required={true}
              rules={requiredRule}
              isClearable={true}
              errors={errors}
            />

            <SelectInput
              name="currentMonth"
              control={control}
              label={PAY_MONTH}
              options={currentMonthOptions}
              required={true}
              rules={requiredRule}
              isClearable={true}
              errors={errors}
            />

            <input
              type="file"
              ref={excelFileUploadRef}
              style={{ display: "none" }}
              onChange={handleExcelFileChange}
              accept=".xlsx, .xls"
            />
          </div>

          {/* Submit Button */}
          <div className="flex-row mr-auto flex-center">
            {isSlipExists === true && (
              <LoadingButton
                dir="ltr"
                endIcon={<EyeIcon />}
                loading={isExistLoading || isExistFetching}
                type="submit"
                variant="contained"
                color="primary"
              >
                <span>{OBSERVE}</span>
              </LoadingButton>
            )}

            {form_data.payType.value === "C" ||
            form_data.payType.value === "E" ? (
              <div style={{ position: "relative" }}>
                <LoadingButton
                  dir="ltr"
                  variant="contained"
                  color="warning"
                  endIcon={<UploadIcon />}
                  loading={isExcelLoading}
                  onClick={handleExcelFileUpload}
                >
                  <span>{UPLOAD_EXCEL}</span>
                </LoadingButton>

                {excelFile && (
                  <div
                    className="excel"
                    style={{
                      position: "absolute",
                      bottom: "-100%",
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
                      <RemoveIcon />
                    </IconButton>
                    <Tooltip title={excelFile.name}>
                      <span className="excel__name">{excelFile.name}</span>
                    </Tooltip>
                    <img
                      src={images.excelImage}
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
              loading={
                isExistLoading || isExistFetching || isInserting || isIssuing
              }
              disabled={isSlipExists}
              variant="contained"
              color="primary"
            >
              <span>{ISSUE}</span>
            </LoadingButton>
          </div>
        </form>

        <SlipsGrid
          data={data}
          isLoading={isGettingPayList}
          isFetching={isFetchingPayList}
        />
      </section>
    </>
  );

  return content;
};
