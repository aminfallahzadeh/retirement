// IMPORTS
import { useEffect, useMemo } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import {
  useUpdateRetiredPersonMutation,
  useGetRetiredPersonQuery,
} from "@/features/retired/retiredApi";
import { toastConfig } from "@/config/toast";
import { setPersonDeathDate } from "@/features/person/personSlice";
import { useAppDispatch } from "@/hooks/usePreTypesHooks";
import { Input } from "@/shared/components/Input";
import { SelectInput } from "@/shared/components/SelectInput";
import { DatePicker } from "@/shared/components/DatePicker";
import { CustomCheckBox } from "@/shared/components/CustomCheckBox";
import { TextArea } from "@/shared/components/TextArea";
import DoneIcon from "@mui/icons-material/DoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useToggleState from "@/hooks/useToggleState";
import { useFetchLookUpData } from "@/hooks/useFetchLookUpData";
import { createOptions } from "@/utils/optionsCreator";
import { retiredPersonSchema, retiredPersonIntKeys } from "./schema";
import {
  processDataForView,
  processDataForRequest,
} from "@/utils/convertFormData";
import {
  SAVE,
  EDIT,
  FIRST_NAME,
  LAST_NAME,
  NATIONAL_CODE,
  CERTIFICATE_NO,
  FATHER_NAME,
  GENDER,
  BIRTH_DATE,
  BIRTH_PLACE,
  PREVIOUS_NAME,
  SACRIFICED_FAMILY,
  WARRIOR,
  CHILD_OF_SACRIFICED,
  VALIANT,
  SACRIFICED,
  CAPTIVE,
  RETIRED_NO,
  PHONE_NO,
  MOBILE_NO,
  BACKUP_PHONE_NO,
  BACKUP_FIRST_NAME,
  BACKUP_LAST_NAME,
  EMAIL_ADDRESS,
  EDUCATION_DEGREE,
  COUNTRY,
  STATE,
  CITY,
  REGION,
  AREA,
  ADDRESS,
  POSTAL_CODE,
  HOUSING_STATUS,
  MARITIAL_STATUS,
  DESCRIPTION,
  DEATH_DATE,
  SACRIFICE_STATUS,
} from "@/constants/const";
import {
  requiredRule,
  nationalCodeRules,
  onlyPersianAlphabetsRules,
  onlyNumbersRules,
  mobileRules,
  emailRules,
  postalCodeRules,
} from "@/constants/rules";

export const PersonForm = () => {
  // STATES
  const [editable, toggleEditable] = useToggleState(false);
  const [searchParams] = useSearchParams();

  // CONSTS
  const dispatch = useAppDispatch();
  const personID = searchParams.get("personID");
  const selectKeys = useMemo(
    () => [
      "genderID",
      "personCountryID",
      "personStateID",
      "personCityID",
      "housingTypeID",
      "educationTypeID",
      "maritalStatusID",
    ],
    []
  );
  const dateKeys = useMemo(() => ["personDeathDate", "personBirthDate"], []);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>();

  // FETCH DATA
  const {
    data: retiredPersonData,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useGetRetiredPersonQuery(personID);
  const [updateRetiredPerson, { isLoading: isUpdating }] =
    useUpdateRetiredPersonMutation();

  const { lookUpItems: genders, lookUpItemsIsLoading: isGenderItemsLoading } =
    useFetchLookUpData({ lookUpType: "Gender" });
  const genderOptions = useMemo(
    () => createOptions(genders, "lookUpID", "lookUpName"),
    [genders]
  );

  const {
    lookUpItems: educationTypes,
    lookUpItemsIsLoading: educationTypesIsLoading,
  } = useFetchLookUpData({ lookUpType: "EducationType" });
  const educationOptions = useMemo(
    () => createOptions(educationTypes, "lookUpID", "lookUpName"),
    [educationTypes]
  );

  const { lookUpItems: countries, lookUpItemsIsLoading: countriesIsLoading } =
    useFetchLookUpData({ lookUpType: "Country" });
  const countryOptions = useMemo(
    () => createOptions(countries, "lookUpID", "lookUpName"),
    [countries]
  );

  const { lookUpItems: states, lookUpItemsIsLoading: statesIsLoading } =
    useFetchLookUpData({ lookUpType: "State" });
  const stateOptions = useMemo(
    () => createOptions(states, "lookUpID", "lookUpName"),
    [states]
  );

  const { lookUpItems: cities, lookUpItemsIsLoading: citiesIsLoading } =
    useFetchLookUpData({ lookUpType: "City" });
  const cityOptions = useMemo(
    () => createOptions(cities, "lookUpID", "lookUpName"),
    [cities]
  );

  const {
    lookUpItems: housingTypes,
    lookUpItemsIsLoading: housingTypesIsLoading,
  } = useFetchLookUpData({ lookUpType: "HousingType" });
  const housingOptions = useMemo(
    () => createOptions(housingTypes, "lookUpID", "lookUpName"),
    [housingTypes]
  );

  const {
    lookUpItems: maritalStatusItems,
    lookUpItemsIsLoading: maritalStatusItemsIsLoading,
  } = useFetchLookUpData({ lookUpType: "MaritialStatus" });
  const maritalStatusOptions = useMemo(
    () => createOptions(maritalStatusItems, "lookUpID", "lookUpName"),
    [maritalStatusItems]
  );

  // HANDLERS
  const onSubmit = async (data: FieldValues) => {
    // CONVERT DATA FOR REQUEST
    const transformedData = processDataForRequest(
      data,
      selectKeys,
      dateKeys,
      retiredPersonIntKeys,
      []
    );

    const response = await updateRetiredPerson(transformedData).unwrap();
    refetch();
    toggleEditable();
    toastConfig.success(response.message);
  };

  // CONVERT DATA FOR VIEW
  useEffect(() => {
    if (isSuccess) {
      const originalData = retiredPersonData?.itemList[0];

      dispatch(
        setPersonDeathDate(
          originalData?.personDeathDate === null ? false : true
        )
      );

      const transformedData = processDataForView(
        originalData,
        selectKeys,
        dateKeys,
        {
          genderID: genderOptions,
          educationTypeID: educationOptions,
          personCountryID: countryOptions,
          personStateID: stateOptions,
          personCityID: cityOptions,
          housingTypeID: housingOptions,
          maritalStatusID: maritalStatusOptions,
        }
      );

      Object.keys(transformedData).forEach((key) => {
        if (retiredPersonSchema.includes(key)) {
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

    return () => {
      dispatch(setPersonDeathDate(null));
    };
  }, [
    dispatch,
    isSuccess,
    retiredPersonData?.itemList,
    setValue,
    genderOptions,
    countryOptions,
    educationOptions,
    stateOptions,
    cityOptions,
    housingOptions,
    maritalStatusOptions,
    dateKeys,
    selectKeys,
  ]);

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
                name="personFirstName"
                label={FIRST_NAME}
                rules={requiredRule}
                required={true}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="personLastName"
                label={LAST_NAME}
                rules={requiredRule}
                required={true}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="personNationalCode"
                label={NATIONAL_CODE}
                rules={{ ...nationalCodeRules, ...requiredRule }}
                required={true}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="personCertificateNo"
                label={CERTIFICATE_NO}
                rules={{ ...onlyNumbersRules, ...requiredRule }}
                required={true}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="personFatherName"
                label={FATHER_NAME}
                rules={onlyPersianAlphabetsRules}
                required={true}
                control={control}
                editable={editable}
                type="text"
              />

              <SelectInput
                name="genderID"
                control={control}
                label={GENDER}
                required={true}
                isClearable={true}
                isDisabled={!editable}
                options={genderOptions}
                isLoading={isGenderItemsLoading}
                rules={requiredRule}
                errors={errors}
              />

              <DatePicker
                name="personBirthDate"
                label={BIRTH_DATE}
                control={control}
                disabled={!editable}
                required={true}
                errors={errors}
                rules={requiredRule}
                setValue={setValue}
              />

              <Input
                name="personBirthPlace"
                label={BIRTH_PLACE}
                rules={onlyPersianAlphabetsRules}
                required={false}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="personPreviousName"
                label={PREVIOUS_NAME}
                rules={onlyPersianAlphabetsRules}
                required={false}
                control={control}
                editable={editable}
                type="text"
              />

              <div
                className={
                  !editable
                    ? "checkboxContainer--disabled col-span-3"
                    : "checkboxContainer col-span-3"
                }
              >
                <p className="inputBox__form--readOnly-label">
                  {SACRIFICE_STATUS}
                </p>

                <CustomCheckBox
                  disabled={!editable}
                  control={control}
                  label={SACRIFICED_FAMILY}
                  name="personIsSacrificedFamily"
                />

                <CustomCheckBox
                  disabled={!editable}
                  control={control}
                  label={WARRIOR}
                  name="personIsWarrior"
                />

                <CustomCheckBox
                  disabled={!editable}
                  control={control}
                  label={CHILD_OF_SACRIFICED}
                  name="personIsChildOfSacrificed"
                />

                <CustomCheckBox
                  disabled={!editable}
                  control={control}
                  label={VALIANT}
                  name="personIsValiant"
                />

                <CustomCheckBox
                  disabled={!editable}
                  control={control}
                  label={SACRIFICED}
                  name="personIsSacrificed"
                />

                <CustomCheckBox
                  disabled={!editable}
                  control={control}
                  label={CAPTIVE}
                  name="personIsCaptive"
                />
              </div>

              <Input
                name="retiredID"
                label={RETIRED_NO}
                required={false}
                control={control}
                editable={false}
                type="text"
              />

              <Input
                name="personPhone"
                label={PHONE_NO}
                required={false}
                rules={onlyNumbersRules}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="personCellPhone"
                label={MOBILE_NO}
                required={false}
                rules={mobileRules}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="backupPhone"
                label={BACKUP_PHONE_NO}
                required={false}
                rules={onlyNumbersRules}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="backupFirstName"
                label={BACKUP_FIRST_NAME}
                required={false}
                rules={onlyPersianAlphabetsRules}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="backupLastName"
                label={BACKUP_LAST_NAME}
                required={false}
                rules={onlyPersianAlphabetsRules}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="personEmail"
                label={EMAIL_ADDRESS}
                required={false}
                rules={emailRules}
                control={control}
                editable={editable}
                type="text"
              />

              <SelectInput
                name="educationTypeID"
                control={control}
                label={EDUCATION_DEGREE}
                required={false}
                isClearable={true}
                isDisabled={!editable}
                options={educationOptions}
                isLoading={educationTypesIsLoading}
              />

              <SelectInput
                name="personCountryID"
                control={control}
                label={COUNTRY}
                required={false}
                isClearable={true}
                isDisabled={!editable}
                options={countryOptions}
                isLoading={countriesIsLoading}
              />

              <SelectInput
                name="personStateID"
                control={control}
                label={STATE}
                required={false}
                isClearable={true}
                isDisabled={!editable}
                options={stateOptions}
                isLoading={statesIsLoading}
              />

              <SelectInput
                name="personCityID"
                control={control}
                label={CITY}
                required={false}
                isClearable={true}
                isDisabled={!editable}
                options={cityOptions}
                isLoading={citiesIsLoading}
              />

              <Input
                name="personRegion"
                label={REGION}
                required={false}
                control={control}
                editable={editable}
                rules={onlyNumbersRules}
                type="text"
              />

              <Input
                name="personArea"
                label={AREA}
                required={false}
                control={control}
                editable={editable}
                rules={onlyNumbersRules}
                type="text"
              />

              <Input
                name="personPostalCode"
                label={POSTAL_CODE}
                required={false}
                control={control}
                editable={editable}
                rules={postalCodeRules}
                type="text"
              />

              <SelectInput
                name="housingTypeID"
                control={control}
                label={HOUSING_STATUS}
                required={false}
                isClearable={true}
                isDisabled={!editable}
                options={housingOptions}
                isLoading={housingTypesIsLoading}
              />

              <SelectInput
                name="maritalStatusID"
                control={control}
                label={MARITIAL_STATUS}
                required={false}
                isClearable={true}
                isDisabled={!editable}
                options={maritalStatusOptions}
                isLoading={maritalStatusItemsIsLoading}
              />

              <DatePicker
                name="personDeathDate"
                label={DEATH_DATE}
                control={control}
                disabled={!editable}
                required={false}
                setValue={setValue}
              />

              <TextArea
                name="personAddress"
                label={ADDRESS}
                required={true}
                control={control}
                editable={editable}
                containerClassNames={"col-span-3"}
              />

              <TextArea
                name="personDescription"
                label={DESCRIPTION}
                required={true}
                control={control}
                editable={editable}
                containerClassNames={"col-span-4 row-span-2"}
              />
            </div>

            {/* Button Section */}
            <div className="flex-row mr-auto">
              <LoadingButton
                dir="ltr"
                endIcon={<DoneIcon />}
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
          </form>
        </section>
      )}
    </>
  );
  return content;
};
