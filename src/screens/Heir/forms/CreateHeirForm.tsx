// IMPORTS
import { useMemo, useState, useCallback, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { BankBranch } from "./types";
import {
  useFetchLookUpData,
  useFetchPensionaryStatus,
  useFetchRelationship,
} from "@/hooks/useFetchLookUpData";
import { useLazyGetLookupDataQuery } from "@/features/shared/sharedApi";
import { Input } from "@/shared/components/Input";
import { DatePicker } from "@/shared/components/DatePicker";
import { TextArea } from "@/shared/components/TextArea";
import { SelectInput } from "@/shared/components/SelectInput";
import { createOptions } from "@/utils/optionsCreator";
import { processDataForRequest } from "@/utils/convertFormData";
import { toastConfig } from "@/config/toast";
import { intKeys, floatKeys } from "./schema";
import { useInsertHeirMutation } from "@/features/heir/heirApi";
import {
  requiredRule,
  onlyPersianAlphabetsRules,
  nationalCodeRules,
  onlyNumbersRules,
  postalCodeRules,
} from "@/constants/rules";
import {
  SAVE,
  RELATION,
  FIRST_NAME,
  LAST_NAME,
  NATIONAL_CODE,
  CERTIFICATE_NO,
  FATHER_NAME,
  BIRTH_DATE,
  HEIR_INFO,
  CHANGE_STATUS_DATE,
  MARITIAL_STATUS,
  BANK,
  MOBILE_NO,
  HEIR_BANK_INFO,
  PHONE_NO,
  REGION,
  AREA,
  COUNTRY,
  STATE,
  CITY,
  POSTAL_CODE,
  ADDRESS,
  SPECIAL_DISEASE,
  HEIR_STATUS,
  DESCRIPTION,
  HEIR_FINISH_DATE,
  BANK_BRANCH,
  ACCOUNT_NO,
  HEIR_LEDGER_CODE,
  INSURANCE_COEF,
  SUB_INSURANCE,
  BIRTH_PLACE,
} from "@/constants/const";

const CreateHeirForm = () => {
  // STATES
  const [bankBranchItems, setBankBranchItems] = useState<BankBranch[]>([]);
  const [searchParams] = useSearchParams();

  // CONSTS
  const navigate = useNavigate();
  const parentPersonID = searchParams.get("id");
  const dateKeys = [
    "personBirthDate",
    "pensionaryStartDate",
    "personBaseFinishDate",
  ];

  const selectKeys = [
    "relationshipWithParentID",
    "maritalStatusID",
    "personCountryID",
    "personStateID",
    "personCityID",
    "pensionaryStatusID",
    "bankID",
    "bankBranchID",
  ];
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>();
  const bankOption = watch("bankID");
  const [insertHeir, { isLoading }] = useInsertHeirMutation();
  const [
    getLookupData,
    {
      isLoading: isBankBranchComboLoading,
      isFetching: isBankBranchComboFetching,
    },
  ] = useLazyGetLookupDataQuery();

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
    // PROCESS DATA FOR SUBMIT
    const transformedData = processDataForRequest(
      data,
      selectKeys,
      dateKeys,
      intKeys,
      floatKeys
    );
    const response = await insertHeir({
      ...transformedData,
      parentPersonID,
    }).unwrap();
    toastConfig.success(response.message);
    navigate(-1);
  };

  // CONTENT
  const content = (
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
            label={HEIR_FINISH_DATE}
            control={control}
            required={false}
            setValue={setValue}
          />
        </div>

        <div className="Modal__header flex justify-center items-center">
          <h4 className="title-secondary">{HEIR_BANK_INFO}</h4>
        </div>

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
            isLoading={isBankBranchComboLoading || isBankBranchComboFetching}
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
            loading={isLoading}
            color="success"
          >
            <span>{SAVE}</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );

  return content;
};

export default CreateHeirForm;
