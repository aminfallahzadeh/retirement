// IMPORTS
import { useEffect, useMemo, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/usePreTypesHooks";
import useToggleState from "@/hooks/useToggleState";
import { Input } from "@/shared/components/Input";
import { DatePicker } from "@/shared/components/DatePicker";
import { SelectInput } from "@/shared/components/SelectInput";
import { createOptions } from "@/utils/optionsCreator";
import { convertToPersianDate } from "@/helpers/dateConverter";
import { convertToEnglishNumber } from "@/helpers/numberConverter";
import { toastConfig } from "@/config/toast";
import { Box, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { StatusHistory } from "@/shared/types/status";
import { StatusHistoryGrid } from "@/shared/components/StatusHistoryGrid";
import {
  processDataForRequest,
  processDataForView,
} from "@/utils/convertFormData";
import {
  useFetchPensionaryStatus,
  useFetchLookUpData,
  useFetchOrganizations,
} from "@/hooks/useFetchLookUpData";
import {
  useUpdateRetiredPensionaryMutation,
  useGetRetiredPensionaryQuery,
  useGetAllPensionariesQuery,
} from "@/features/retired/retiredApi";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  requiredRule,
  onlyNumbersRules,
  onlyPersianAlphabetsRules,
} from "@/constants/rules";
import { retiredPensionarySchema } from "./schema";
import {
  GROUP,
  SAVE,
  EDIT,
  LAST_ORGANIZATION,
  POSITION,
  EMPLOYMENT_TYPE,
  RETIREMENT_DATE,
  STATUS,
  CHANGE_STATUS_DATE,
  JOB_DEGREE_COEF,
  RETIRED_REAL_DURATION,
  RETIRED_GRANT_DURATION,
} from "@/constants/const";

export const PensionaryForm = () => {
  // STATES
  const [statusTableData, setStatusTableData] = useState<StatusHistory[]>([]);
  const [editable, toggleEditable] = useToggleState(false);
  const [searchParams] = useSearchParams();

  // CONSTS
  const personID = searchParams.get("personID");
  const { personDeathDate } = useAppSelector((state) => state.person);
  const selectKeys = useMemo(
    () => ["retiredOrganizationID", "employmentTypeID", "pensionaryStatusID"],
    []
  );
  const dateKeys = useMemo(() => ["retirementDate", "pensionaryStartdate"], []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>();

  const {
    data: pensionary,
    isSuccess,
    isLoading,
    isFetching,
    refetch: refetchPensionary,
  } = useGetRetiredPensionaryQuery(personID);
  const {
    data: statusHistory,
    isSuccess: isStatusHistorySuccess,
    isLoading: isStatusHistoryLoading,
    isFetching: isStatusHistoryFetching,
    refetch: refetchStatusHistory,
  } = useGetAllPensionariesQuery(personID);

  const [updateRetiredPensionary, { isLoading: isUpdating }] =
    useUpdateRetiredPensionaryMutation();
  const { organizations, organizationIsLoading } = useFetchOrganizations({});
  const {
    lookUpItems: employmentTypes,
    lookUpItemsIsLoading: employmentTypesIsLoading,
  } = useFetchLookUpData({ lookUpType: "EmploymentType" });
  const { pensionaryStatus, pensionaryStatusIsLoading } =
    useFetchPensionaryStatus({
      pensionaryStatusCategory: "R",
      pensionaryStatusIsDead: personDeathDate,
    });

  const organizationOptions = useMemo(
    () => createOptions(organizations, "organizationID", "organizationName"),
    [organizations]
  );

  const employmentTypeOptions = useMemo(
    () => createOptions(employmentTypes, "lookUpID", "lookUpName"),
    [employmentTypes]
  );

  const pensionaryStatusOptions = useMemo(
    () =>
      createOptions(
        pensionaryStatus,
        "pensionaryStatusID",
        "pensionaryStatusName"
      ),
    [pensionaryStatus]
  );

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      const originalData = pensionary?.itemList[0];

      if (originalData) {
        const data = { ...originalData };

        Object.keys(data).forEach((key) => {
          if (key === "retirementDate") {
            data[key] =
              data[key] === null ? null : convertToPersianDate(data[key]);
          }

          if (key === "pensionaryStartdate") {
            data[key] =
              data[key] === null ? null : convertToPersianDate(data[key]);
          }

          setValue(key, data[key]);
        });
      }
    }
  }, [isSuccess, pensionary?.itemList, setValue]);

  const onSubmit = async (data: FieldValues) => {
    // CONVERT DATA FOR REQUEST
    const transformedData = processDataForRequest(data, selectKeys, dateKeys);

    const response = await updateRetiredPensionary({
      ...transformedData,
      retiredGroup: parseInt(convertToEnglishNumber(data.retiredGroup)),
      retiredJobDegreeCoef: parseInt(
        convertToEnglishNumber(data.retiredJobDegreeCoef)
      ),
      retiredRealDuration: parseInt(
        convertToEnglishNumber(data.retiredRealDuration)
      ),
      retiredGrantDuration: parseInt(
        convertToEnglishNumber(data.retiredGrantDuration)
      ),
      personID,
    }).unwrap();
    toggleEditable();
    refetchPensionary();
    refetchStatusHistory();
    toastConfig.success(response.message);
  };

  // CONVERT DATA FOR VIEW
  useEffect(() => {
    if (isSuccess) {
      const originalData = pensionary?.itemList[0];

      const transformedData = processDataForView(
        originalData,
        selectKeys,
        dateKeys,
        {
          retiredOrganizationID: organizationOptions,
          employmentTypeID: employmentTypeOptions,
          pensionaryStatusID: pensionaryStatusOptions,
        }
      );

      Object.keys(transformedData).forEach((key) => {
        if (retiredPensionarySchema.includes(key)) {
          if (transformedData[key] === null) {
            setValue(key, "");
          } else {
            setValue(key, transformedData[key]);
          }
        } else {
          setValue(key, transformedData[key]);
        }
      });
    }
  }, [
    isSuccess,
    pensionary?.itemList,
    organizationOptions,
    employmentTypeOptions,
    pensionaryStatusOptions,
    setValue,
    selectKeys,
    dateKeys,
  ]);

  useEffect(() => {
    if (isStatusHistorySuccess) {
      const mappedData = statusHistory?.itemList.map(
        (item: StatusHistory, index: number) => ({
          id: item.pensionaryID,
          isActive: item.pensionaryIsActive,
          pensionaryStatusRowNum: index + 1,
          pensionaryStatusName: item.pensionaryStatusName || "-",
          pensionaryStartdate: item.pensionaryStartdate || "-",
        })
      );

      setStatusTableData(mappedData);
    }
  }, [isStatusHistorySuccess, statusHistory?.itemList]);

  return (
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
        <section className="flex-col">
          <form
            method="POST"
            className="flex-col"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Form Fields */}
            <div className="grid grid-cols-4">
              <Input
                name={"retiredGroup"}
                label={GROUP}
                control={control}
                required={true}
                editable={editable}
                rules={{ ...requiredRule, ...onlyNumbersRules }}
                type="text"
              />

              <SelectInput
                name="retiredOrganizationID"
                control={control}
                label={LAST_ORGANIZATION}
                required={true}
                isClearable={true}
                isDisabled={!editable}
                options={organizationOptions}
                isLoading={organizationIsLoading}
                rules={requiredRule}
                errors={errors}
              />

              <Input
                name={"retiredLastPosition"}
                label={POSITION}
                control={control}
                required={false}
                editable={editable}
                rules={onlyPersianAlphabetsRules}
                type="text"
              />

              <SelectInput
                name="employmentTypeID"
                control={control}
                label={EMPLOYMENT_TYPE}
                required={true}
                isClearable={true}
                isDisabled={!editable}
                options={employmentTypeOptions}
                isLoading={employmentTypesIsLoading}
                rules={requiredRule}
                errors={errors}
              />

              <DatePicker
                name="retirementDate"
                label={RETIREMENT_DATE}
                control={control}
                disabled={!editable}
                required={false}
                errors={errors}
                rules={requiredRule}
                setValue={setValue}
              />

              <SelectInput
                name="pensionaryStatusID"
                control={control}
                label={STATUS}
                required={true}
                isClearable={true}
                isDisabled={!editable}
                options={pensionaryStatusOptions}
                isLoading={pensionaryStatusIsLoading}
                rules={requiredRule}
                errors={errors}
              />

              <DatePicker
                name="pensionaryStartdate"
                label={CHANGE_STATUS_DATE}
                control={control}
                disabled={!editable}
                required={true}
                errors={errors}
                rules={requiredRule}
                setValue={setValue}
              />

              <Input
                name={"retiredJobDegreeCoef"}
                label={JOB_DEGREE_COEF}
                control={control}
                required={false}
                editable={editable}
                rules={onlyNumbersRules}
                type="text"
              />

              <Input
                name={"retiredGrantDuration"}
                label={RETIRED_REAL_DURATION}
                control={control}
                required={false}
                editable={editable}
                rules={onlyNumbersRules}
                type="text"
              />

              <Input
                name={"retiredRealDuration"}
                label={RETIRED_GRANT_DURATION}
                control={control}
                required={false}
                editable={editable}
                rules={onlyNumbersRules}
                type="text"
              />
            </div>

            {/* Button Section */}
            <div className="flex-row mr-auto">
              <LoadingButton
                dir="ltr"
                endIcon={<DoneOutlinedIcon />}
                disabled={!editable}
                variant="contained"
                type="submit"
                loading={isUpdating}
                color="success"
              >
                <span>{SAVE}</span>
              </LoadingButton>

              <LoadingButton
                dir="ltr"
                endIcon={<EditOutlinedIcon />}
                onClick={toggleEditable}
                disabled={editable}
                variant="contained"
                color="primary"
              >
                <span>{EDIT}</span>
              </LoadingButton>
            </div>
            <div className="flex-col flex-center">
              <h5 className="title-secondary">تاریخچه وضعیت ها</h5>
            </div>

            <StatusHistoryGrid
              data={statusTableData}
              isLoading={isStatusHistoryLoading}
              isFetching={isStatusHistoryFetching}
            />
          </form>
        </section>
      )}
    </>
  );
};
