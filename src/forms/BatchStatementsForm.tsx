// IMPORTS
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setFilteredPersonsTableData } from "@/features/statement/statementSlice";
import {
  useGetStatementListFromFiltersMutation,
  useGetStatementListFromExcelMutation,
} from "@/features/statement/statementApi";
import {
  useFetchPensionaryStatus,
  useFetchLookUpData,
} from "@/hooks/useFetchLookUpData";
import { Switch, LinearProgress, Box, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  VisibilityRounded as EyeIcon,
  UploadRounded as UploadIcon,
  DeleteOutline as RemoveIcon,
} from "@mui/icons-material";
import FilteredPersonsGrid from "@/grids/FilteredPersonsGrid";
import StatementItemsForm from "./StatementItemsForm";
import { toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import * as XLSX from "xlsx";
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "@/utils/reactSelect";
import { convertToEnglishNumber } from "../helper";

function BatchStatementsForm() {
  // EXCEL FILE UPLOAD REF
  const excelFileUploadRef = useRef(null);

  // CONTROL STATE
  const [isDraftGenerated, setIsDraftGenerated] = useState(false);

  // FILTER STATES
  const [excelFile, setExcelFile] = useState(null);
  const [isExcel, setIsExcel] = useState(false);
  const [isExcelFileUploaded, setIsExcelFileUploaded] = useState(false);
  const [isDataRecived, setIsDataRecived] = useState(false);

  // MAIN STATE
  const [data, setData] = useState({});
  const [nationalCodesFromExcel, setNationalCodesFromExcel] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();

  // GET LOOK UP DATA
  const {
    lookUpItems: emplymentTypes,
    lookUpItemsIsLoading: employmnetTypesIsLoading,
    lookUpItemsIsFetching: employmnetTypesIsFetching,
  } = useFetchLookUpData({ lookUpType: "EmploymentType" });

  const {
    lookUpItems: genders,
    lookUpItemsIsLoading: gendersIsLoading,
    lookUpItemsIsFetching: gendersIsFetching,
  } = useFetchLookUpData({ lookUpType: "Gender" });

  const {
    pensionaryStatus,
    pensionaryStatusIsLoading,
    pensionaryStatusIsFetching,
  } = useFetchPensionaryStatus({ pensionaryStatusCategory: "R" });

  // SELECT OPTIONS
  const employmentOptions = optionsGenerator(
    emplymentTypes,
    "lookUpID",
    "lookUpName"
  );

  const genderOptions = optionsGenerator(genders, "lookUpID", "lookUpName");

  const statusOptions = optionsGenerator(
    pensionaryStatus,
    "pensionaryStatusID",
    "pensionaryStatusName"
  );

  // ACCESS THE FILTER QUERY
  const [
    getStatementListFromFilters,
    { isLoading: isStatementListLoading, isFetching: isStatementListFetching },
  ] = useGetStatementListFromFiltersMutation();

  const [
    getListFromExcel,
    {
      isLoading: isGetListFromExcelLoading,
      isFetching: isGetListFromExcelFetching,
    },
  ] = useGetStatementListFromExcelMutation();

  // FETCH WITH EXCEL DATA FUNCTION
  const fetchWithExcel = useCallback(
    async (data) => {
      try {
        const res = await getListFromExcel(data).unwrap();
        const mappedData = res.map((item, index) => ({
          id: item.id,
          selectedPersonRowNum: index + 1 || "-",
          selectedPersonNationalCode: item.nationalCode || "-",
          selectedPersonName: item.firstName || "-",
          selectedPersonLastName: item.lastName || "-",
        }));
        dispatch(setFilteredPersonsTableData(mappedData));
        setIsExcelFileUploaded(true);
        setIsDataRecived(true);
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error, {
          autoClose: 2000,
        });
      }
    },
    [getListFromExcel, dispatch]
  );

  // SEND EXCEL REQUEST IF EXCEL UPLOADED
  useEffect(() => {
    if (isExcelFileUploaded) {
      fetchWithExcel(nationalCodesFromExcel);
    }
  }, [isExcelFileUploaded, nationalCodesFromExcel, fetchWithExcel]);

  // HANDLERS
  const handleRemoveExcelFile = () => {
    setExcelFile(null);
    setUploadProgress(0);
  };

  const handleExcelFileUpload = () => {
    excelFileUploadRef.current.click();
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
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // FIND NATIONAL CODES FROM ALL CELLS
        const nationalCodes = [];
        let invalidCodes = false;

        json.forEach((row) => {
          row.forEach((cell) => {
            if (cell !== null && cell !== undefined && cell !== "") {
              const code = convertToEnglishNumber(cell.toString());
              if (code.length !== 10) {
                invalidCodes = true;
              }
              nationalCodes.push(code);
            }
          });
        });

        if (invalidCodes) {
          setExcelFile(null);
          setUploadProgress(0);
          toast.error("فایل دارای کد ملی نا معتبر است");
        } else {
          setNationalCodesFromExcel(nationalCodes);
          setIsExcelFileUploaded(true);
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

  const handleDataChange = (selectedOptions, actionMeta) => {
    const name = actionMeta.name;
    const value = selectedOptions
      ? selectedOptions.map((item) => item.value)
      : [];
    setData({ ...data, [name]: value });
  };

  const handleIsExcelChange = () => {
    setIsExcel(!isExcel);
    dispatch(setFilteredPersonsTableData([]));
    setIsExcelFileUploaded(false);
    setIsDataRecived(false);
  };

  const handleFilterListByValues = async () => {
    try {
      const filterRes = await getStatementListFromFilters(data).unwrap();
      const mappedData = filterRes.map((item, index) => ({
        id: item.personID,
        selectedPersonRowNum: index + 1 || "-",
        selectedPersonNationalCode: item.nationalCode || "-",
        selectedPersonName: item.firstName || "-",
        selectedPersonLastName: item.lastName || "-",
      }));
      dispatch(setFilteredPersonsTableData(mappedData));
      setIsDataRecived(true);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  // CLEARE TABLE DATA ON UNMOUNT
  useEffect(() => {
    return () => {
      dispatch(setFilteredPersonsTableData([]));
      setIsExcelFileUploaded(false);
      setIsDataRecived(false);
    };
  }, [dispatch]);

  const content = (
    <>
      <input
        type="file"
        ref={excelFileUploadRef}
        style={{ display: "none" }}
        onChange={handleExcelFileChange}
        accept=".xlsx, .xls"
      />

      <section className="flex-col formContainer">
        <form className="grid grid--col-4" noValidate>
          <div className="checkboxContainer">
            <span className="checkboxContainer__label">فایل اکسل</span>
            <Switch checked={isExcel} onChange={handleIsExcelChange} />
          </div>
          <div>&nbsp;</div>

          {isExcel ? (
            <div
              style={{ marginRight: "auto" }}
              className="flex-row flex-center col-span-2"
            >
              {excelFile && (
                <div className="excel">
                  <IconButton
                    color="error"
                    size="small"
                    onClick={handleRemoveExcelFile}
                    sx={{ padding: 0 }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <span className="excel__name">{excelFile.name}</span>
                  <img src="./images/excel-icon.png" className="excel__image" />
                </div>
              )}
              <div style={{ position: "relative" }}>
                <LoadingButton
                  dir="ltr"
                  variant="contained"
                  color="warning"
                  disabled={uploadProgress > 0 || excelFile ? true : false}
                  endIcon={<UploadIcon />}
                  loading={
                    isGetListFromExcelFetching || isGetListFromExcelLoading
                  }
                  onClick={handleExcelFileUpload}
                >
                  <span>بارگزاری اکسل</span>
                </LoadingButton>

                <Box
                  sx={{
                    position: "absolute",
                    left: "50%",
                    bottom: "-40px",
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
                  <span style={{ fontFamily: "IranYekan", fontSize: "12px" }}>
                    {uploadProgress}%
                  </span>
                </Box>
              </div>
            </div>
          ) : (
            <div>&nbsp;</div>
          )}

          {!isExcel && (
            <>
              <div>&nbsp;</div>

              <div className="inputBox__form">
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  onChange={handleDataChange}
                  options={employmentOptions}
                  defaultValue={[]}
                  name="employmentTypeIDs"
                  placeholder={
                    <div className="react-select-placeholder">
                      <span>*</span> نوع سازمان
                    </div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  isMulti
                  isLoading={
                    employmnetTypesIsLoading || employmnetTypesIsFetching
                  }
                  styles={selectStyles}
                />

                <label
                  className={
                    data?.employmentTypeIDs &&
                    data?.employmentTypeIDs?.length > 0
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  <span>*</span> نوع سازمان
                </label>
              </div>
              <div className="inputBox__form">
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  onChange={handleDataChange}
                  defaultValue={[]}
                  options={genderOptions}
                  name="genderIDs"
                  placeholder={
                    <div className="react-select-placeholder">
                      <span>*</span> جنسیت
                    </div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  isMulti
                  isLoading={gendersIsLoading || gendersIsFetching}
                  styles={selectStyles}
                />

                <label
                  className={
                    data?.genderIDs && data?.genderIDs?.length > 0
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  <span>*</span> جنسیت
                </label>
              </div>
              <div className="inputBox__form">
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  onChange={handleDataChange}
                  options={statusOptions}
                  defaultValue={[]}
                  name="pensionaryStatusIDs"
                  placeholder={
                    <div className="react-select-placeholder">
                      <span>*</span> وضعیت
                    </div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  isMulti
                  isLoading={
                    pensionaryStatusIsLoading || pensionaryStatusIsFetching
                  }
                  styles={selectStyles}
                />

                <label
                  className={
                    data?.pensionaryStatusIDs &&
                    data?.pensionaryStatusIDs?.length > 0
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  <span>*</span> وضعیت
                </label>
              </div>

              <div
                style={{ marginRight: "auto" }}
                className="flex-row flex-center"
              >
                <LoadingButton
                  dir="ltr"
                  variant="contained"
                  disabled={
                    !data.employmentTypeIDs ||
                    !data.genderIDs ||
                    !data.pensionaryStatusIDs ||
                    data.employmentTypeIDs.length === 0 ||
                    data.genderIDs.length === 0 ||
                    data.pensionaryStatusIDs.length === 0
                  }
                  loading={isStatementListFetching || isStatementListLoading}
                  onClick={handleFilterListByValues}
                  color="primary"
                  endIcon={<EyeIcon />}
                >
                  <span>مشاهده</span>
                </LoadingButton>
              </div>
            </>
          )}
        </form>
      </section>

      {!isDraftGenerated && <FilteredPersonsGrid />}

      {isDataRecived && (
        <StatementItemsForm
          isDraftGenerated={isDraftGenerated}
          setIsDraftGenerated={setIsDraftGenerated}
        />
      )}
    </>
  );
  return content;
}

export default BatchStatementsForm;
