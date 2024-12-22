// IMPORTS
import { useEffect, useMemo, useCallback, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { setFractionData } from "@/features/fraction/fractionSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/usePreTypesHooks";
import { useLazyGetPersonsQuery } from "@/features/person/personApi";
import {
  useFetchPersonnelStatementOffType,
  useFetchOrganizations,
} from "@/hooks/useFetchLookUpData";
import { Input } from "@/shared/components/Input";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { SelectInput } from "@/shared/components/SelectInput";
import { LoadingButton } from "@mui/lab";
import { createOptions } from "@/utils/optionsCreator";
import { convertToEnglishNumber } from "@/helpers/numberConverter";
import { StatementGrid } from "../components/StatementGrid";
import {
  NATIONAL_CODE,
  FIRST_NAME,
  LAST_NAME,
  PERSONNEL_NO,
  CALCULATE_TYPE,
  ORGANIZATION_NAME,
  CONTINUE,
} from "@/constants/const";
import { requiredRule, nationalCodeRules } from "@/constants/rules";

const CalculateFractionStepOne = () => {
  // STATES
  const [personID, setPersonID] = useState<string | null>(null);
  const [selectedSerial, setSelectedSerial] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // CONSTS
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm<FieldValues>();
  const nationalCode = watch("personNationalCode");
  const [
    searchPerson,
    { isLoading: isSearchLoading, isFetching: isSearchFetching },
  ] = useLazyGetPersonsQuery();

  const { personnelStatementOffTypes, personnelStatementOffTypesIsLoading } =
    useFetchPersonnelStatementOffType();
  const { organizations, organizationIsLoading } = useFetchOrganizations({});

  const offTypesOptions = useMemo(
    () =>
      createOptions(
        personnelStatementOffTypes,
        "personnelStatementOffTypeID",
        "personnelStatementOffTypeName"
      ),
    [personnelStatementOffTypes]
  );

  const organizationOptions = useMemo(
    () => createOptions(organizations, "organizationID", "organizationName"),
    [organizations]
  );

  // HANDLERS
  const handleRowSelect = useCallback((rowId: string | null) => {
    setSelectedSerial(rowId);
  }, []);

  const onSubmit = (data: FieldValues) => {
    dispatch(setFractionData({ ...data, serial: selectedSerial }));
    navigate("/retirement/fraction/calculate/2");
  };

  const fetchPersonData = useCallback(async () => {
    const response = await searchPerson({
      personNationalCode: convertToEnglishNumber(nationalCode),
    }).unwrap();
    const data = response.itemList[0];
    if (data) {
      setValue("personFirstName", data.personFirstName);
      setValue("personLastName", data.personLastName);
      setValue("personnelID", data.personnelID);
      setPersonID(data.personID);
    }
  }, [nationalCode, searchPerson, setValue]);

  // EFFECTS
  useEffect(() => {
    const validateAndFetch = async () => {
      const isValid = await trigger("personNationalCode");
      if (isValid) {
        fetchPersonData();
      } else {
        setValue("personFirstName", "");
        setValue("personLastName", "");
        setValue("personnelID", "");
        setPersonID(null);
        setSelectedSerial(null);
      }
    };

    if (nationalCode) {
      validateAndFetch();
    } else {
      setValue("personFirstName", "");
      setValue("personLastName", "");
      setValue("personnelID", "");
      setPersonID(null);
      setSelectedSerial(null);
    }
  }, [trigger, fetchPersonData, nationalCode, setValue]);

  return (
    <>
      <section className="flex-col">
        <form
          id="authorize-form"
          method="POST"
          className="flex-col formContainer"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Form Fields */}
          <div className="grid grid-cols-4">
            <Input
              name="personNationalCode"
              label={NATIONAL_CODE}
              rules={{ ...requiredRule, ...nationalCodeRules }}
              required={true}
              control={control}
              type="text"
            />

            <Input
              name="personFirstName"
              label={FIRST_NAME}
              required={false}
              editable={false}
              control={control}
              isLoading={isSearchLoading || isSearchFetching}
              type="text"
            />

            <Input
              name="personLastName"
              label={LAST_NAME}
              required={false}
              editable={false}
              control={control}
              isLoading={isSearchLoading || isSearchFetching}
              type="text"
            />

            <Input
              name="personnelID"
              label={PERSONNEL_NO}
              required={false}
              editable={false}
              control={control}
              isLoading={isSearchLoading || isSearchFetching}
              type="text"
            />

            <SelectInput
              name="statementType"
              control={control}
              label={CALCULATE_TYPE}
              required={false}
              isClearable={true}
              options={offTypesOptions}
              isLoading={personnelStatementOffTypesIsLoading}
              //   rules={requiredRule}
              errors={errors}
            />

            <SelectInput
              name="organizationID"
              control={control}
              label={ORGANIZATION_NAME}
              required={false}
              isClearable={true}
              options={organizationOptions}
              isLoading={organizationIsLoading}
              //   rules={requiredRule}
              errors={errors}
            />
          </div>

          <StatementGrid
            personID={personID}
            handleRowSelect={handleRowSelect}
          />

          {/* Button Section */}
          <div className="flex-row ml-auto">
            <LoadingButton
              dir="ltr"
              disabled={!selectedSerial ? true : false}
              endIcon={<ArrowForward />}
              variant="contained"
              type="submit"
              color="success"
            >
              <span>{CONTINUE}</span>
            </LoadingButton>
          </div>
        </form>
      </section>
    </>
  );
};

export default CalculateFractionStepOne;
