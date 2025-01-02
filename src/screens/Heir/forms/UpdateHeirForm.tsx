// IMPORTS
import { useMemo, useEffect, useState, useCallback } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { Box, CircularProgress } from "@mui/material";
import {
  useGetHeirQuery,
  useUpdateHeirMutation,
} from "@/features/heir/heirApi";
import {
  useFetchLookUpData,
  useFetchPensionaryStatus,
  useFetchRelationship,
} from "@/hooks/useFetchLookUpData";
import { useLazyGetLookupDataQuery } from "@/features/shared/sharedApi";
import { useGetAllPensionariesQuery } from "@/features/retired/retiredApi";
import { Input } from "@/shared/components/Input";
import { DatePicker } from "@/shared/components/DatePicker";
import { TextArea } from "@/shared/components/TextArea";
import { SelectInput } from "@/shared/components/SelectInput";
import { createOptions } from "@/utils/optionsCreator";
import { StatusHistoryGrid } from "@/shared/components/StatusHistoryGrid";
import { StatusHistory } from "@/shared/types/status";
import {
  processDataForRequest,
  processDataForView,
} from "@/utils/convertFormData";
import { BankBranch } from "./types";
import { toastConfig } from "@/config/toast";
import {
  requiredRule,
  onlyPersianAlphabetsRules,
  nationalCodeRules,
  onlyNumbersRules,
  postalCodeRules,
} from "@/constants/rules";
import { heirSchema, dateKeys, selectKeys, intKeys, floatKeys } from "./schema";
import {
  SAVE,
  RELATION,
  FIRST_NAME,
  LAST_NAME,
  NATIONAL_CODE,
  CERTIFICATE_NO,
  FATHER_NAME,
  BIRTH_DATE,
  BANK,
  CHANGE_STATUS_DATE,
  MARITIAL_STATUS,
  MOBILE_NO,
  PHONE_NO,
  REGION,
  AREA,
  COUNTRY,
  STATE,
  CITY,
  POSTAL_CODE,
  ADDRESS,
  SPECIAL_DISEASE,
  DESCRIPTION,
  BIRTH_PLACE,
  HEIR_INFO,
  STATUS_HISTORIES,
  HEIR_STATUS,
  DATE,
  HEIR_NO,
  HEIR_DATE,
  BANK_BRANCH,
  SUB_INSURANCE,
  INSURANCE_COEF,
  HEIR_LEDGER_CODE,
  ACCOUNT_NO,
} from "@/constants/const";

const UpdateHeirForm = () => {
  // STATES
  const [historyTableData, setHistoryTableData] = useState<StatusHistory[]>([]);
  const [bankBranchItems, setBankBranchItems] = useState<BankBranch[]>([]);
  const [searchParams] = useSearchParams();

  // CONSTS
  const navigate = useNavigate();
  const parentPersonID = searchParams.get("id");
  const personID = searchParams.get("personID");
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>();
  const bankOption = watch("bankID");
  const {
    data: heir,
    isSuccess,
    isLoading,
    isFetching,
    refetch,
  } = useGetHeirQuery(personID);

  const {
    data: statusHistory,
    isSuccess: isStatusHistorySuccess,
    isLoading: isStatusHistoryLoading,
    isFetching: isStatusHistoryFetching,
    refetch: refetchStatus,
  } = useGetAllPensionariesQuery(personID);

  const [
    getLookupData,
    {
      isLoading: isBankBranchComboLoading,
      isFetching: isBankBranchComboFetching,
    },
  ] = useLazyGetLookupDataQuery();
  const [updateHeir, { isLoading: isUpdating }] = useUpdateHeirMutation();
  const { relationships, relationshipIsLoading } = useFetchRelationship();
  const relationOptions = useMemo(
    () => createOptions(relationships, "relationshipID", "relationshipName"),
    [relationships]
  );

  const {
    lookUpItems: maritialStatusItems,
    lookUpItemsIsLoading: maritialStatusIsLoading,
  } = useFetchLookUpData({ lookUpType: "MaritialStatus" });
  const maritialStatusOptions = useMemo(
    () => createOptions(maritialStatusItems, "lookUpID", "lookUpName"),
    [maritialStatusItems]
  );

  const {
    lookUpItems: countryItems,
    lookUpItemsIsLoading: countryItemsIsLoading,
  } = useFetchLookUpData({ lookUpType: "Country" });
  const countryOptions = useMemo(
    () => createOptions(countryItems, "lookUpID", "lookUpName"),
    [countryItems]
  );

  const { lookUpItems: stateItems, lookUpItemsIsLoading: stateItemsIsLoading } =
    useFetchLookUpData({ lookUpType: "State" });
  const stateOptions = useMemo(
    () => createOptions(stateItems, "lookUpID", "lookUpName"),
    [stateItems]
  );

  const { lookUpItems: cityItems, lookUpItemsIsLoading: cityItemsIsLoading } =
    useFetchLookUpData({ lookUpType: "City" });
  const cityOptions = useMemo(
    () => createOptions(cityItems, "lookUpID", "lookUpName"),
    [cityItems]
  );

  const { pensionaryStatus, pensionaryStatusIsLoading } =
    useFetchPensionaryStatus({
      pensionaryStatusCategory: "H",
      pensionaryStatusIsDead: null,
    });
  const pensionaryStatusOptions = useMemo(
    () =>
      createOptions(
        pensionaryStatus,
        "pensionaryStatusID",
        "pensionaryStatusName"
      ),
    [pensionaryStatus]
  );

  const { lookUpItems: bankItems, lookUpItemsIsLoading: bankItemsIsLoading } =
    useFetchLookUpData({ lookUpType: "Bank" });
  const bankOptions = useMemo(
    () => createOptions(bankItems, "lookUpID", "lookUpName"),
    [bankItems]
  );

  const bankBranchOptions = useMemo(
    () => createOptions(bankBranchItems, "lookUpID", "lookUpName"),
    [bankBranchItems]
  );

  // HANDLERS
  const fetchBankBranch = useCallback(
    async (id: string) => {
      const response = await getLookupData({
        lookUpType: "BankBranch",
        lookUpParentID: id,
      }).unwrap();
      setBankBranchItems(response.itemList);
    },
    [getLookupData]
  );

  useEffect(() => {
    if (bankOption) {
      fetchBankBranch(bankOption.value);
    } else {
      setValue("bankBranchID", null);
      setBankBranchItems([]);
    }
  }, [bankOption, fetchBankBranch, setValue]);

  const onSubmit = async (data: FieldValues) => {
    // CONVERT DATA FOR REQUEST

    const transformedData = processDataForRequest(
      data,
      selectKeys,
      dateKeys,
      intKeys,
      floatKeys
    );
    const response = await updateHeir({
      ...transformedData,
      parentPersonID,
    }).unwrap();
    toastConfig.success(response.message);
    refetch();
    refetchStatus();
    navigate(-1);
  };

  useEffect(() => {
    if (isStatusHistorySuccess) {
      const mappedData = statusHistory.itemList.map(
        (item: StatusHistory, index: number) => ({
          id: item.pensionaryID,
          pensionaryStatusRowNum: index + 1,
          isActive: item.pensionaryIsActive,
          pensionaryStatusName: item.pensionaryStatusName || "-",
          pensionaryStartdate: item.pensionaryStartdate || "-",
        })
      );

      setHistoryTableData(mappedData);
    }
  }, [isStatusHistorySuccess, statusHistory]);

  // CONVERT DATA FOR VIEW
  useEffect(() => {
    if (isSuccess) {
      const data = { ...heir };

      delete data.bankID;
      delete data.bankBranchID;

      const transformedData = processDataForView(data, selectKeys, dateKeys, {
        relationshipWithParentID: relationOptions,
        pensionaryStatusID: pensionaryStatusOptions,
        maritalStatusID: maritialStatusOptions,
        personCountryID: countryOptions,
        personStateID: stateOptions,
        personCityID: cityOptions,
      });

      Object.keys(transformedData).forEach((key) => {
        if (heirSchema.includes(key)) {
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
    heir,
    setValue,
    relationOptions,
    pensionaryStatusOptions,
    maritialStatusOptions,
    countryOptions,
    stateOptions,
    cityOptions,
  ]);

  useEffect(() => {
    if (isSuccess && bankOptions.length > 0) {
      setValue(
        "bankID",
        bankOptions.find((item) => item.value === heir.bankID)
      );
    }
  }, [isSuccess, heir, setValue, bankOptions]);

  useEffect(() => {
    if (isSuccess && bankBranchOptions.length > 0) {
      setValue(
        "bankBranchID",
        bankBranchOptions.find((item) => item.value === heir.bankBranchID)
      );
    }
  }, [isSuccess, heir, setValue, bankBranchOptions]);

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
        <section className="flex-col mb-20">
          <form
            method="POST"
            className="flex-col formContainer"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Form Fields */}
            <div className="grid grid-cols-4">
              <SelectInput
                name="relationshipWithParentID"
                control={control}
                label={RELATION}
                required={true}
                isClearable={true}
                options={relationOptions}
                isLoading={relationshipIsLoading}
                rules={requiredRule}
                errors={errors}
              />

              <Input
                name="personFirstName"
                label={FIRST_NAME}
                rules={{ ...requiredRule, ...onlyPersianAlphabetsRules }}
                required={true}
                control={control}
                type="text"
              />

              <Input
                name="personLastName"
                label={LAST_NAME}
                rules={{ ...requiredRule, ...onlyPersianAlphabetsRules }}
                required={true}
                control={control}
                type="text"
              />

              <Input
                name="personNationalCode"
                label={NATIONAL_CODE}
                rules={{ ...requiredRule, ...nationalCodeRules }}
                required={true}
                control={control}
                type="text"
              />

              <Input
                name="personCertificateNo"
                label={CERTIFICATE_NO}
                rules={{ ...requiredRule, ...onlyNumbersRules }}
                required={true}
                control={control}
                type="text"
              />

              <Input
                name="personFatherName"
                label={FATHER_NAME}
                rules={onlyPersianAlphabetsRules}
                required={false}
                control={control}
                type="text"
              />

              <DatePicker
                name="personBirthDate"
                label={BIRTH_DATE}
                control={control}
                required={false}
                setValue={setValue}
              />

              <Input
                name="personBirthPlace"
                label={BIRTH_PLACE}
                rules={onlyPersianAlphabetsRules}
                required={false}
                control={control}
                type="text"
              />

              <SelectInput
                name="maritalStatusID"
                control={control}
                label={MARITIAL_STATUS}
                required={false}
                isClearable={true}
                options={maritialStatusOptions}
                isLoading={maritialStatusIsLoading}
              />

              <Input
                name="personPhone"
                label={PHONE_NO}
                rules={onlyNumbersRules}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="personCellPhone"
                label={MOBILE_NO}
                rules={onlyNumbersRules}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="personRegion"
                label={REGION}
                rules={onlyNumbersRules}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="personArea"
                label={AREA}
                rules={onlyNumbersRules}
                required={false}
                control={control}
                type="text"
              />

              <SelectInput
                name="personCountryID"
                control={control}
                label={COUNTRY}
                required={false}
                isClearable={true}
                options={countryOptions}
                isLoading={countryItemsIsLoading}
              />

              <SelectInput
                name="personStateID"
                control={control}
                label={STATE}
                required={false}
                isClearable={true}
                options={stateOptions}
                isLoading={stateItemsIsLoading}
              />

              <SelectInput
                name="personCityID"
                control={control}
                label={CITY}
                required={false}
                isClearable={true}
                options={cityOptions}
                isLoading={cityItemsIsLoading}
              />

              <Input
                name="personPostalCode"
                label={POSTAL_CODE}
                rules={postalCodeRules}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="personSpecialDisease"
                label={SPECIAL_DISEASE}
                rules={onlyPersianAlphabetsRules}
                required={false}
                control={control}
                type="text"
              />

              <TextArea
                name="personAddress"
                label={ADDRESS}
                control={control}
                containerClassNames="col-span-4"
              />

              <TextArea
                name="personDescription"
                label={DESCRIPTION}
                control={control}
                containerClassNames="col-span-4 row-span-2"
              />
            </div>

            <div className="Modal__header flex justify-center items-center">
              <h4 className="title-secondary">{HEIR_INFO}</h4>
            </div>

            <div className="grid grid-cols-4">
              <SelectInput
                name="pensionaryStatusID"
                control={control}
                label={HEIR_STATUS}
                required={false}
                isClearable={true}
                options={pensionaryStatusOptions}
                isLoading={pensionaryStatusIsLoading}
              />

              <DatePicker
                name="pensionaryStartDate"
                label={CHANGE_STATUS_DATE}
                control={control}
                required={false}
                setValue={setValue}
              />

              <DatePicker
                name="personBaseFinishDate"
                label={DATE}
                control={control}
                required={false}
                setValue={setValue}
              />

              <Input
                name="heirID"
                label={HEIR_NO}
                required={false}
                editable={false}
                control={control}
                type="text"
              />

              <DatePicker
                name="pensionaryStartDate"
                label={HEIR_DATE}
                control={control}
                disabled={true}
                required={false}
                setValue={setValue}
              />
            </div>

            <div className="Modal__header flex justify-center items-center">
              <h4 className="title-secondary">{STATUS_HISTORIES}</h4>
            </div>

            <StatusHistoryGrid
              data={historyTableData}
              isLoading={isStatusHistoryLoading}
              isFetching={isStatusHistoryFetching}
            />

            <div className="grid grid-cols-4">
              <SelectInput
                name="bankID"
                control={control}
                label={BANK}
                required={false}
                isClearable={true}
                options={bankOptions}
                isLoading={bankItemsIsLoading}
                errors={errors}
              />

              <SelectInput
                name="bankBranchID"
                control={control}
                label={BANK_BRANCH}
                required={false}
                isClearable={true}
                options={bankBranchOptions}
                isLoading={
                  isBankBranchComboLoading || isBankBranchComboFetching
                }
                errors={errors}
              />

              <Input
                name="accountNo"
                label={ACCOUNT_NO}
                rules={onlyNumbersRules}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="ledgerCode"
                label={HEIR_LEDGER_CODE}
                rules={onlyNumbersRules}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="insuranceCoef"
                label={INSURANCE_COEF}
                rules={onlyNumbersRules}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="insuranceAmount"
                label={SUB_INSURANCE}
                required={false}
                control={control}
                type="text"
              />
            </div>

            {/* Button Section */}
            <div className="flex-row mr-auto">
              <LoadingButton
                dir="ltr"
                endIcon={<DoneOutlinedIcon />}
                variant="contained"
                type="submit"
                loading={isUpdating}
                color="success"
              >
                <span>{SAVE}</span>
              </LoadingButton>
            </div>
          </form>
        </section>
      )}
    </>
  );

  return content;
};

export default UpdateHeirForm;
