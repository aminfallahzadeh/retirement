// IMPORTS
import { useEffect, useMemo, useCallback, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/hooks/usePreTypesHooks";
import { useCalculateFractionFromStatementMutation } from "@/features/fraction/fractionApi";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { Input } from "@/shared/components/Input";
import { LoadingButton } from "@mui/lab";
import { requiredRule } from "@/constants/rules";
import {
  CONTINUE,
  INCLUDED_FRACTION_AMOUNT,
  TRANSFERRED_AMOUNT,
  COMPUTABLE_YEARS,
  YEAR,
  DAY,
  MONTH,
} from "@/constants/const";

const CalculateFractionStepTwo = () => {
  // STATES
  // CONSTS
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<FieldValues>();
  const { fractionData: stepOneData } = useAppSelector(
    (state) => state.fraction
  );
  const dispatch = useAppDispatch();
  const [calculateFraction, { isLoading, isFetching, isSuccess }] =
    useCalculateFractionFromStatementMutation();

  // HANDLERS
  const fetchCalculation = useCallback(async () => {
    const response = await calculateFraction({
      personNationalCode: stepOneData.personNationalCode,
      personnelStatementOffTypeID: stepOneData.statementType.value,
      organizationID: stepOneData.organizationID.value,
      numberOfInstallments: 0,
      personnelStatementSerialNO: parseInt(stepOneData.serial),
      periods: null,
      save: false,
    }).unwrap();

    console.log("CALCULATION", response);
  }, [calculateFraction, stepOneData]);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  useEffect(() => {
    if (stepOneData) {
      fetchCalculation();
    }
  }, [stepOneData, fetchCalculation]);

  // DEBUG
  useEffect(() => {
    console.log(stepOneData);
  }, [stepOneData]);

  // MAIN
  const content = (
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
            name="includedAmount"
            label={INCLUDED_FRACTION_AMOUNT}
            rules={requiredRule}
            required={true}
            control={control}
            type="text"
          />

          <Input
            name="transferredAmount"
            label={TRANSFERRED_AMOUNT}
            rules={requiredRule}
            required={true}
            control={control}
            type="text"
          />
        </div>

        <div className="Modal__header flex justify-center items-center">
          <h4 className="title-secondary">{COMPUTABLE_YEARS}</h4>
        </div>

        <div className="grid grid-cols-4">
          <div className="flex justify-center items-center">
            <h1>تاریخ از :</h1>
          </div>

          <Input
            name="startYear"
            label={YEAR}
            rules={requiredRule}
            required={true}
            control={control}
            type="text"
          />

          <Input
            name="startMonth"
            label={MONTH}
            rules={requiredRule}
            required={true}
            control={control}
            type="text"
          />

          <Input
            name="startDay"
            label={DAY}
            rules={requiredRule}
            required={true}
            control={control}
            type="text"
          />

          <div className="flex justify-center items-center">
            <h1>تاریخ تا :</h1>
          </div>

          <Input
            name="endYear"
            label={YEAR}
            rules={requiredRule}
            required={true}
            control={control}
            type="text"
          />

          <Input
            name="endMonth"
            label={MONTH}
            rules={requiredRule}
            required={true}
            control={control}
            type="text"
          />

          <Input
            name="endDay"
            label={DAY}
            rules={requiredRule}
            required={true}
            control={control}
            type="text"
          />
        </div>

        {/* Button Section */}
        <div className="flex-row ml-auto">
          <LoadingButton
            dir="ltr"
            // disabled={!selectedSerial ? true : false}
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
  );
  return content;
};

export default CalculateFractionStepTwo;
