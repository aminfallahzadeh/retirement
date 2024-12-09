// IMPORTS
import { useState, useEffect, useCallback } from "react";
import {
  setSelectIDs,
  setQueryCondi,
} from "../slices/reportGeneratorDataSlice";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/usePreTypesHooks";
import {
  useLazyGetColsQuery,
  useLazyGetLookupValueQuery,
} from "@/features/report-generator/reportGeneratorApi";
import { useFetchReportGeneratorTables } from "@/hooks/useFetchLookUpData";
import { IconButton, Tooltip, Button } from "@mui/material";
import {
  DeleteOutline as RemoveIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import ConditionSelectionForm from "./ConditionSelectionForm";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { findById } from "../helper";
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "../utils/reactSelect";

function ReportGeneratorTableForm() {
  // CONTROLLED STATES
  const [disabaleAddButton, setDisableAddButton] = useState(false);
  const [disableOperators, setDisableOperators] = useState(true);

  // MAIN STATES
  const [data, setData] = useState({ operator: "%3D" });
  const [conditionText, setConditionText] = useState("");

  // LOOK UP STATES
  const [featureCombo, setFeatureCombo] = useState([]);
  const [conditionCombo, setConditionCombo] = useState([]);

  const [isLookup, setIsLookup] = useState(false);

  const [getCols, { isLoading: isColsLoading, isFetching: isColsFetching }] =
    useLazyGetColsQuery();

  const [
    getLookupValue,
    { isLoading: isLookupLoading, isFetching: isLookupFetching },
  ] = useLazyGetLookupValueQuery();

  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();

  const { queryCondi } = useAppSelector((state) => state.reportGeneratorData);
  const { role } = useAppSelector((state) => state.role);

  // GET LOOK UP DATA
  const {
    reportGeneratorTables,
    reportGeneratorTablesIsLoading,
    reportGeneratorTablesIsFetching,
  } = useFetchReportGeneratorTables(role?.value);

  // SELECT OPTIONS
  const tableOptions = optionsGenerator(
    reportGeneratorTables,
    "tableName",
    "tableNameFarsi"
  );

  const fetureOptions = optionsGenerator(featureCombo, "id", "columnTitle");

  const operatorOptions = [
    { value: "%3D", label: "=" },
    { value: "%3E", label: ">" },
    { value: "%3C", label: "<" },
    { value: "%3E%3D", label: ">=" },
    { value: "%3C%3D", label: "<=" },
    { value: "LIKE", label: "LIKE" },
  ];

  const conditionOptions = optionsGenerator(conditionCombo, "value", "text");

  // GET COLS FUNCTION
  const fetchColsData = useCallback(
    async (TableName) => {
      try {
        const res = await getCols(TableName).unwrap();
        setFeatureCombo(res.itemList);
      } catch (err) {
        console.log(err);
      }
    },
    [getCols]
  );

  // GET COLS IF USER CHANGES TABLE
  useEffect(() => {
    if (data.TableName) {
      fetchColsData(data.TableName);
    }
  }, [data.TableName, fetchColsData]);

  // GET LOOKUP VALUE FUNCTION
  const fetchLookupValue = useCallback(
    async (id) => {
      try {
        const res = await getLookupValue(id).unwrap();
        setConditionCombo(res.itemList);
      } catch (err) {
        console.log(err);
      }
    },
    [getLookupValue]
  );

  // GET LOOKUP VALUE isLookup IS TRUE
  useEffect(() => {
    if (isLookup) {
      fetchLookupValue(data.columnid);
    }
  }, [data, fetchLookupValue, isLookup]);

  useEffect(() => {
    if (data.columnid) {
      const columnData = findById(featureCombo, data.columnid);
      if (columnData) {
        setIsLookup(columnData.isLookup === 0 ? false : true);
      }
    }
  }, [data, featureCombo]);

  // HANDLERS
  const addConditionHandler = (colId, op, condi) => {
    let result;
    const colData = findById(featureCombo, colId);
    const colText = colData.columnTitle;
    const opText = findById(operatorOptions, op, "value").label;

    if (isLookup) {
      const condiData = findById(conditionCombo, condi, "value");
      const condiText = condiData.text;
      result = `${colText} ${opText} ${condiText}`;
    } else {
      dispatch(setQueryCondi(queryCondi + `%23${colId}%23${op}%23${condi}`));
      result = `${colText} ${opText} ${condi}`;
    }

    setConditionText(conditionText + " " + result);
    setDisableAddButton(true);
    setDisableOperators(false);
  };

  // HANDLE DATA CHANGE
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // HANDLE SELECT OPTION CHANGE
  const handleSelectOptionChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    if (selectedOption) {
      const { value } = selectedOption;
      setData({ ...data, [name]: value || "" });
    } else {
      setData({ ...data, [name]: null });
    }
  };

  // HADNLE MULTI SELECT CHANGE
  const handleMultiSelectChange = (selectedOptions, actionMeta) => {
    const name = actionMeta.name;
    const value = selectedOptions
      ? selectedOptions.map((item) => item.value)
      : [];
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (data.tableSelects && data.tableSelects.length === 1) {
      dispatch(setSelectIDs(data.tableSelects[0] + "%24"));
    } else if (data.tableSelects && data.tableSelects.length === 0) {
      dispatch(setSelectIDs(""));
    } else if (data.tableSelects && data.tableSelects.length > 1) {
      dispatch(setSelectIDs(data.tableSelects.join("%24") + "%24"));
    }
  }, [data.tableSelects, dispatch]);

  const handleDeleteAllconditions = () => {
    dispatch(setQueryCondi(""));
    setConditionText("");
    setDisableAddButton(false);
    setDisableOperators(true);
    setData({ ...data, condition: "" });
  };

  const addConditionElement = (element) => {
    setConditionText((prev) => `${prev} ${element}`);
    dispatch(setQueryCondi(queryCondi + `%24${element}%24`));
    setDisableAddButton(false);
    setDisableOperators(true);
  };

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="flex-col">
        <div
          className="grid grid--col-4"
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <div className="inputBox__form">
            <input
              type="text"
              id="reportName"
              name="reportName"
              onChange={handleDataChange}
              value={data.reportName || ""}
              className="inputBox__form--input"
              required
            />
            <label htmlFor="reportName" className="inputBox__form--label">
              نام گزارش
            </label>
          </div>

          <div className="inputBox__form">
            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={tableOptions}
              onChange={handleSelectOptionChange}
              value={tableOptions.find(
                (item) => item.value === data?.TableName
              )}
              name="TableName"
              isClearable={true}
              placeholder={<div className="react-select-placeholder">جدول</div>}
              noOptionsMessage={selectSettings.noOptionsMessage}
              loadingMessage={selectSettings.loadingMessage}
              styles={selectStyles}
              isLoading={
                reportGeneratorTablesIsLoading ||
                reportGeneratorTablesIsFetching
              }
            />

            <label
              className={
                data?.TableName
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              جدول
            </label>
          </div>

          <div className="inputBox__form">
            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={fetureOptions}
              onChange={handleMultiSelectChange}
              value={fetureOptions.find(
                (item) => item.value === data?.tableSelects
              )}
              name="tableSelects"
              isMulti
              isClearable={true}
              placeholder={
                <div className="react-select-placeholder">
                  انتخاب ستون های خروجی
                </div>
              }
              noOptionsMessage={selectSettings.noOptionsMessage}
              loadingMessage={selectSettings.loadingMessage}
              styles={selectStyles}
              isLoading={isColsLoading || isColsFetching}
              isDisabled={isColsLoading || isColsFetching || !data.TableName}
            />

            <label
              className={
                data?.tableSelects && data?.tableSelects.length > 0
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              انتخاب ستون های خروجی
            </label>
          </div>
        </div>

        <div
          className="flex-col"
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <div className="grid grid--col-4-mid-sm-last-sm">
            <div className="inputBox__form">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={fetureOptions}
                onChange={handleSelectOptionChange}
                value={fetureOptions.find(
                  (item) => item.value === data?.columnid
                )}
                name="columnid"
                isClearable={true}
                placeholder={
                  <div className="react-select-placeholder">
                    خصوصیت شرط پذیر
                  </div>
                }
                noOptionsMessage={selectSettings.noOptionsMessage}
                loadingMessage={selectSettings.loadingMessage}
                styles={selectStyles}
                isLoading={isColsLoading || isColsFetching}
                isDisabled={isColsLoading || isColsFetching || !data.TableName}
              />

              <label
                className={
                  data?.columnid
                    ? "inputBox__form--readOnly-label"
                    : "inputBox__form--readOnly-label-hidden"
                }
              >
                خصوصیت شرط پذیر
              </label>
            </div>

            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              options={operatorOptions}
              onChange={handleSelectOptionChange}
              value={operatorOptions.find(
                (item) => item.value === data?.operator
              )}
              name="operator"
              isClearable={false}
              noOptionsMessage={selectSettings.noOptionsMessage}
              loadingMessage={selectSettings.loadingMessage}
              styles={selectStyles}
            />

            {data.columnid && !isLookup && (
              <div className="inputBox__form">
                <input
                  type="text"
                  className="inputBox__form--input"
                  value={data.condition}
                  id="condition"
                  name="condition"
                  onChange={handleDataChange}
                  required
                />

                <label className="inputBox__form--label" htmlFor="condition">
                  شرط
                </label>
              </div>
            )}

            {data.columnid && isLookup && (
              <div className="inputBox__form">
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  options={conditionOptions}
                  onChange={handleSelectOptionChange}
                  value={fetureOptions.find(
                    (item) => item.value === data?.condition
                  )}
                  name="condition"
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">شرط</div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                  isLoading={isLookupFetching || isLookupLoading}
                />

                <label
                  className={
                    data?.condition
                      ? "inputBox__form--readOnly-label"
                      : "inputBox__form--readOnly-label-hidden"
                  }
                >
                  شرط
                </label>
              </div>
            )}

            <div>
              <Tooltip title="افزودن شرط">
                <span>
                  <IconButton
                    color="success"
                    onClick={() =>
                      addConditionHandler(
                        data.columnid,
                        data.operator,
                        data.condition
                      )
                    }
                    disabled={
                      !data.TableName ||
                      !data.operator ||
                      !data.columnid ||
                      !data.condition ||
                      disabaleAddButton
                    }
                  >
                    <AddIcon />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="پاک کردن تمامی شروط">
                <span>
                  <IconButton color="error" onClick={handleDeleteAllconditions}>
                    <RemoveIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          </div>

          <div className="grid grid--col-2-first-sm">
            <div className="grid grid--col-2">
              {["or", "and", "(", ")", "null", "%"].map((element) => (
                <Button
                  key={element}
                  dir="ltr"
                  variant="contained"
                  color="info"
                  disabled={disableOperators}
                  onClick={() => addConditionElement(element)}
                >
                  <span>{element.toUpperCase()}</span>
                </Button>
              ))}
            </div>
            <div className="condition__box row-span-3">
              <h4 className="condition__box--title">شروط انتخاب شده:</h4>
              <p>{conditionText}</p>
            </div>
          </div>
        </div>
      </form>

      <ConditionSelectionForm
        fetureOptions={fetureOptions}
        isColsLoading={isColsLoading}
        isColsFetching={isColsFetching}
        tableName={data.TableName}
        reportName={data.reportName}
      />
    </section>
  );

  return content;
}

export default ReportGeneratorTableForm;
