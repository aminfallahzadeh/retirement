// IMPORTS
import { useEffect } from "react";
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
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, CircularProgress, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useToggleState from "@/hooks/useToggleState";
import { useFetchLookUpData } from "@/hooks/useFetchLookUpData";
import { createOptions } from "@/utils/optionsCreator";
import { convertToPersianDate } from "@/helpers/dateHelper";
import {
  SAVE,
  EDIT,
  FIRST_NAME,
  LAST_NAME,
  NATIONAL_CODE,
  CORTICATE_NO,
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
} from "@/constants/const";
import {
  requiredRule,
  nationalCodeRules,
  certificateNoRules,
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

  // CONVERT DATES
  useEffect(() => {
    if (isSuccess) {
      const originalData = retiredPersonData?.itemList[0];

      if (originalData) {
        const data = { ...originalData };

        Object.keys(data).forEach((key) => {
          if (key === "personDeathDate") {
            data[key] =
              data[key] === null ? null : convertToPersianDate(data[key]);
          }

          if (key === "personBirthDate") {
            data[key] =
              data[key] === null ? null : convertToPersianDate(data[key]);
          }

          setValue(key, data[key]);
        });

        dispatch(
          setPersonDeathDate(data?.personDeathDate === null ? false : true)
        );
      }
    }

    return () => {
      dispatch(setPersonDeathDate(null));
    };
  }, [dispatch, isSuccess, retiredPersonData?.itemList, setValue]);

  const { lookUpItems: genders, lookUpItemsIsLoading: isGenderItemsLoading } =
    useFetchLookUpData({ lookUpType: "Gender" });
  const genderOptions = createOptions(genders, "lookUpID", "lookUpName");

  const {
    lookUpItems: educationTypes,
    lookUpItemsIsLoading: educationTypesIsLoading,
  } = useFetchLookUpData({ lookUpType: "EducationType" });
  const educationOptions = createOptions(
    educationTypes,
    "lookUpID",
    "lookUpName"
  );

  const { lookUpItems: countries, lookUpItemsIsLoading: countriesIsLoading } =
    useFetchLookUpData({ lookUpType: "Country" });
  const countryOptions = createOptions(countries, "lookUpID", "lookUpName");

  const { lookUpItems: states, lookUpItemsIsLoading: statesIsLoading } =
    useFetchLookUpData({ lookUpType: "State" });
  const stateOptions = createOptions(states, "lookUpID", "lookUpName");

  const { lookUpItems: cities, lookUpItemsIsLoading: citiesIsLoading } =
    useFetchLookUpData({ lookUpType: "City" });
  const cityOptions = createOptions(cities, "lookUpID", "lookUpName");

  const {
    lookUpItems: housingTypes,
    lookUpItemsIsLoading: housingTypesIsLoading,
  } = useFetchLookUpData({ lookUpType: "HousingType" });
  const housingOptions = createOptions(housingTypes, "lookUpID", "lookUpName");

  const {
    lookUpItems: maritalStatusItems,
    lookUpItemsIsLoading: maritalStatusItemsIsLoading,
  } = useFetchLookUpData({ lookUpType: "MaritialStatus" });
  const maritalStatusOptions = createOptions(
    maritalStatusItems,
    "lookUpID",
    "lookUpName"
  );

  // HANDLERS
  const onSubmit = async (data: FieldValues) => {
    let personDeathDate;
    let personBirthDate;

    if (data.personDeathDate) {
      personDeathDate = new Date(data.personDeathDate);
      personDeathDate.setMinutes(
        personDeathDate.getMinutes() - personDeathDate.getTimezoneOffset()
      );
    } else {
      personDeathDate = null;
    }

    if (data.personBirthDate) {
      personBirthDate = new Date(data.personBirthDate);
      personBirthDate.setMinutes(
        personBirthDate.getMinutes() - personBirthDate.getTimezoneOffset()
      );
    } else {
      personBirthDate = null;
    }

    const updateRes = await updateRetiredPerson({
      ...data,
      personBirthDate,
      personDeathDate,
    }).unwrap();
    refetch();
    toggleEditable();
    toastConfig.success(updateRes.message);
  };

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
                rules={nationalCodeRules}
                required={true}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="personCertificateNo"
                label={CORTICATE_NO}
                rules={certificateNoRules}
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
                  وضعیت ایثارگری:
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
                name="backupNum"
                label={BACKUP_PHONE_NO}
                required={false}
                rules={onlyNumbersRules}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="backupName"
                label={BACKUP_FIRST_NAME}
                required={false}
                rules={onlyPersianAlphabetsRules}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="backupLname"
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
            <div style={{ marginRight: "auto" }} className="flex-row">
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

              <Button
                dir="ltr"
                endIcon={<EditOutlinedIcon />}
                onClick={toggleEditable}
                disabled={editable}
                variant="contained"
                color="primary"
              >
                <span>{EDIT}</span>
              </Button>
            </div>
          </form>
        </section>
      )}
    </>
  );
  return content;
};
