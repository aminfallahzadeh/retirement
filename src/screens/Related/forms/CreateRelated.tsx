// IMPORTS
import { useMemo } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import DoneIcon from "@mui/icons-material/DoneOutlined";
import { useInsertRelatedMutation } from "@/features/related/relatedApi";
import {
  useFetchLookUpData,
  useFetchPensionaryStatus,
  useFetchRelationship,
} from "@/hooks/useFetchLookUpData";
import { Input } from "@/shared/components/Input";
import { DatePicker } from "@/shared/components/DatePicker";
import { TextArea } from "@/shared/components/TextArea";
import { SelectInput } from "@/shared/components/SelectInput";
import { createOptions } from "@/utils/optionsCreator";
import { processDataForRequest } from "@/utils/convertFormData";
import { toastConfig } from "@/config/toast";
import { intKeys } from "./schema";
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
  MARITIAL_DATE,
  CHANGE_STATUS_DATE,
  MARITIAL_STATUS,
  EDUCATION_DEGREE,
  DEGREE_TITLE,
  UNIVERSITY,
  UNIVERSITY_UNIT,
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
  STATUS,
  START_DATE,
  END_DATE,
  BIRTH_PLACE,
  RELATED_STATUS,
  SELF_PROCLAIMED_INFO,
  BACKUP_INFO,
} from "@/constants/const";

const CreateRelated = () => {
  // STATES
  const [searchParams] = useSearchParams();

  // CONSTS
  const navigate = useNavigate();
  const parentPersonID = searchParams.get("id");
  const dateKeys = [
    "personBirthDate",
    "personMaritalDate",
    "selfEmployeeStartDate",
    "selfEmployeeEndDate",
    "pensionaryStartDate",
  ];
  const selectKeys = [
    "relationshipWithParentID",
    "pensionaryStatusID",
    "maritalStatusID",
    "educationTypeID",
    "universityID",
    "personCountryID",
    "personStateID",
    "personCityID",
  ];
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>();
  const [insertRelated, { isLoading }] = useInsertRelatedMutation();
  const { relationships, relationshipIsLoading } = useFetchRelationship();
  const { pensionaryStatus, pensionaryStatusIsLoading } =
    useFetchPensionaryStatus({
      pensionaryStatusCategory: "L",
      pensionaryStatusIsDead: null,
    });

  const {
    lookUpItems: maritialStatusItems,
    lookUpItemsIsLoading: maritialStatusIsLoading,
  } = useFetchLookUpData({ lookUpType: "MaritialStatus" });

  const {
    lookUpItems: educationTypes,
    lookUpItemsIsLoading: educationTypesIsLoading,
  } = useFetchLookUpData({ lookUpType: "EducationType" });

  const {
    lookUpItems: universityTypes,
    lookUpItemsIsLoading: universityTypesIsLoading,
  } = useFetchLookUpData({ lookUpType: "UniversityType" });

  const {
    lookUpItems: countryItems,
    lookUpItemsIsLoading: countryItemsIsLoading,
  } = useFetchLookUpData({ lookUpType: "Country" });

  const { lookUpItems: stateItems, lookUpItemsIsLoading: stateItemsIsLoading } =
    useFetchLookUpData({ lookUpType: "State" });

  const { lookUpItems: cityItems, lookUpItemsIsLoading: cityItemsIsLoading } =
    useFetchLookUpData({ lookUpType: "City" });

  const maritialStatusOptions = useMemo(
    () => createOptions(maritialStatusItems, "lookUpID", "lookUpName"),
    [maritialStatusItems]
  );

  const relationOptions = useMemo(
    () => createOptions(relationships, "relationshipID", "relationshipName"),
    [relationships]
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

  const educationOptions = useMemo(
    () => createOptions(educationTypes, "lookUpID", "lookUpName"),
    [educationTypes]
  );

  const universityOptions = useMemo(
    () => createOptions(universityTypes, "lookUpID", "lookUpName"),
    [universityTypes]
  );

  const countryOptions = useMemo(
    () => createOptions(countryItems, "lookUpID", "lookUpName"),
    [countryItems]
  );

  const stateOptions = useMemo(
    () => createOptions(stateItems, "lookUpID", "lookUpName"),
    [stateItems]
  );

  const cityOptions = useMemo(
    () => createOptions(cityItems, "lookUpID", "lookUpName"),
    [cityItems]
  );

  // HANDLERS
  const onSubmit = async (data: FieldValues) => {
    // CONVERT DATA FOR REQUEST
    const transformedData = processDataForRequest(
      data,
      selectKeys,
      dateKeys,
      intKeys,
      []
    );
    const response = await insertRelated({
      ...transformedData,
      parentPersonID,
    }).unwrap();
    toastConfig.success(response.message);
    navigate(-1);
  };

  // MAIN
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

          <DatePicker
            name="personMaritalDate"
            label={MARITIAL_DATE}
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
            name="pensionaryStatusID"
            control={control}
            label={RELATED_STATUS}
            required={true}
            isClearable={true}
            options={pensionaryStatusOptions}
            isLoading={pensionaryStatusIsLoading}
            rules={requiredRule}
            errors={errors}
          />

          <DatePicker
            name="pensionaryStartDate"
            label={CHANGE_STATUS_DATE}
            control={control}
            required={false}
            setValue={setValue}
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

          <SelectInput
            name="educationTypeID"
            control={control}
            label={EDUCATION_DEGREE}
            required={false}
            isClearable={true}
            options={educationOptions}
            isLoading={educationTypesIsLoading}
          />

          <Input
            name="educationTypeCaption"
            label={DEGREE_TITLE}
            rules={onlyPersianAlphabetsRules}
            required={false}
            control={control}
            type="text"
          />

          <SelectInput
            name="universityID"
            control={control}
            label={UNIVERSITY}
            required={false}
            isClearable={true}
            options={universityOptions}
            isLoading={universityTypesIsLoading}
          />

          <Input
            name="universityCaption"
            label={UNIVERSITY_UNIT}
            rules={onlyPersianAlphabetsRules}
            required={false}
            control={control}
            type="text"
          />

          <Input
            name="personCellPhone"
            label={MOBILE_NO + " ۱"}
            rules={onlyNumbersRules}
            required={false}
            control={control}
            type="text"
          />

          <Input
            name="personCellPhone2"
            label={MOBILE_NO + " ۲"}
            rules={onlyNumbersRules}
            required={false}
            control={control}
            type="text"
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
          <h4 className="title-secondary">{SELF_PROCLAIMED_INFO}</h4>
        </div>

        <div className="grid grid-cols-4">
          <Input
            name="selfEmployeeTypeName"
            label={STATUS}
            rules={onlyPersianAlphabetsRules}
            required={false}
            control={control}
            type="text"
          />

          <DatePicker
            name="selfEmployeeStartDate"
            label={START_DATE}
            control={control}
            required={false}
            setValue={setValue}
          />

          <DatePicker
            name="selfEmployeeEndDate"
            label={END_DATE}
            control={control}
            required={false}
            setValue={setValue}
          />

          <TextArea
            name="selfEmployeeDesc"
            label={DESCRIPTION}
            control={control}
            containerClassNames="col-span-4"
          />
        </div>

        <div className="Modal__header flex justify-center items-center">
          <h4 className="title-secondary">{BACKUP_INFO}</h4>
        </div>

        <div className="grid grid-cols-4">
          <Input
            name="backupFirstName"
            label={FIRST_NAME}
            rules={onlyPersianAlphabetsRules}
            required={false}
            control={control}
            type="text"
          />

          <Input
            name="backupLastName"
            label={LAST_NAME}
            rules={onlyPersianAlphabetsRules}
            required={false}
            control={control}
            type="text"
          />

          <Input
            name="backupRelation"
            label={RELATION}
            rules={onlyPersianAlphabetsRules}
            required={false}
            control={control}
            type="text"
          />

          <Input
            name="backupPhone"
            label={PHONE_NO}
            rules={onlyNumbersRules}
            required={false}
            control={control}
            type="text"
          />

          <Input
            name="backupCellphone"
            label={MOBILE_NO}
            rules={onlyNumbersRules}
            required={false}
            control={control}
            type="text"
          />

          <TextArea
            name="backupAddress"
            label={ADDRESS}
            control={control}
            containerClassNames="col-span-3"
          />
        </div>

        {/* Button Section */}
        <div className="flex-row mr-auto">
          <LoadingButton
            dir="ltr"
            endIcon={<DoneIcon />}
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

export default CreateRelated;
