// IMPORTS
import { useEffect, useCallback } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/hooks/usePreTypesHooks";
import { setFractionData } from "@/features/fraction/fractionSlice";
import { useCalculateFractionFromStatementMutation } from "@/features/fraction/fractionApi";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { Input } from "@/shared/components/Input";
import { CustomCheckBox } from "@/shared/components/CustomCheckBox";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress } from "@mui/material";
import { separateByThousand } from "@/helpers/numberConverter";
import { useEnterToSubmit } from "@/hooks/useEnterToSubmit";
import {
  INCLUDED_FRACTION_AMOUNT,
  TRANSFERRED_AMOUNT,
  COMPUTABLE_YEARS,
  YEAR,
  DAY,
  MONTH,
  FIRST_NAME,
  LAST_NAME,
  NATIONAL_CODE,
  PERSONNEL_NO,
  CALCULATE,
  DELAY_AND_MODIFICATION,
  FROM_DATE,
  TO_DATE,
} from "@/constants/const";

const CalculateFractionStepTwo = () => {
  // CONSTS
  const { fractionData: stepOneData } = useAppSelector(
    (state) => state.fraction
  );
  const { control, handleSubmit, setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      personNationalCode: stepOneData?.personNationalCode,
      personFirstName: stepOneData?.personFirstName,
      personLastName: stepOneData?.personLastName,
      personnelID: stepOneData?.personnelID,
    },
  });
  const delay = watch("delay");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [calculateFraction, { isLoading }] =
    useCalculateFractionFromStatementMutation();

  // HANDLERS
  const fetchCalculation = useCallback(async () => {
    /**
     * {
    "personNationalCode": "2949233211",
    "personnelStatementOffTypeID": "3",
    "organizationID": "0",
    "numberOfInstallments": 0,
    "personnelStatementSerialNO": 1,
    "periods": null,
    "save": false
    }
     */
    const response = await calculateFraction({
      personNationalCode: stepOneData.personNationalCode,
      personnelStatementOffTypeID: stepOneData?.statementType?.value || "0",
      organizationID: stepOneData?.organizationID?.value || "0",
      numberOfInstallments: 0,
      personnelStatementSerialNO: parseInt(stepOneData.serial),
      periods: null,
      save: false,
    }).unwrap();

    const data = response?.itemList[0];

    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "number") {
        setValue(key, separateByThousand(data[key]));
      } else {
        setValue(key, data[key]);
      }
    });
  }, [calculateFraction, stepOneData, setValue]);

  const onSubmit = async (data: FieldValues) => {
    dispatch(setFractionData({ ...data, ...stepOneData }));
    navigate("/retirement/fraction/calculate/3");
  };

  useEffect(() => {
    if (stepOneData) {
      fetchCalculation();
    } else {
      navigate("/retirement/fraction/calculate/1", { replace: true });
    }
  }, [stepOneData, fetchCalculation, navigate]);

  useEnterToSubmit();

  // MAIN
  const content = (
    <>
      {isLoading ? (
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
                editable={false}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="personFirstName"
                label={FIRST_NAME}
                required={false}
                editable={false}
                control={control}
                type="text"
              />

              <Input
                name="personLastName"
                label={LAST_NAME}
                required={false}
                editable={false}
                control={control}
                type="text"
              />

              <Input
                name="personnelID"
                label={PERSONNEL_NO}
                required={false}
                editable={false}
                control={control}
                type="text"
              />

              <Input
                name="sumFraction"
                label={INCLUDED_FRACTION_AMOUNT}
                editable={false}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="transportedPay"
                label={TRANSFERRED_AMOUNT}
                required={false}
                control={control}
                type="text"
              />
            </div>
            <div className="Modal__header flex justify-center items-center">
              <h4 className="title-secondary">{COMPUTABLE_YEARS}</h4>
            </div>
            <div className="grid grid-cols-4">
              <div className="flex justify-center items-center">
                <h1>{FROM_DATE}</h1>
              </div>

              <Input
                name="startYear"
                label={YEAR}
                editable={false}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="startMonth"
                label={MONTH}
                editable={false}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="startDay"
                label={DAY}
                editable={false}
                required={false}
                control={control}
                type="text"
              />

              <div className="flex justify-center items-center">
                <h1>{TO_DATE}</h1>
              </div>

              <Input
                name="endYear"
                label={YEAR}
                editable={false}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="endMonth"
                label={MONTH}
                editable={false}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="endDay"
                label={DAY}
                editable={false}
                required={false}
                control={control}
                type="text"
              />
            </div>

            <div className="ml-auto">
              <CustomCheckBox
                name="delay"
                label={DELAY_AND_MODIFICATION}
                control={control}
              />
            </div>
            {delay && (
              <div className="grid grid-cols-4">
                <div className="flex justify-center items-center">
                  <h1>{FROM_DATE}</h1>
                </div>

                <Input
                  name="startYearDelay"
                  label={YEAR}
                  required={false}
                  control={control}
                  type="text"
                />

                <Input
                  name="startMonthDelay"
                  label={MONTH}
                  required={false}
                  control={control}
                  type="text"
                />

                <Input
                  name="startDayDelay"
                  label={DAY}
                  required={false}
                  control={control}
                  type="text"
                />

                <div className="flex justify-center items-center">
                  <h1>{TO_DATE}</h1>
                </div>

                <Input
                  name="endYearDelay"
                  label={YEAR}
                  required={false}
                  control={control}
                  type="text"
                />

                <Input
                  name="endMonthDelay"
                  label={MONTH}
                  required={false}
                  control={control}
                  type="text"
                />

                <Input
                  name="endDayDelay"
                  label={DAY}
                  required={false}
                  control={control}
                  type="text"
                />
              </div>
            )}
            {/* Button Section */}
            <div className="flex-row ml-auto">
              <LoadingButton
                dir="ltr"
                endIcon={<ArrowForward />}
                variant="contained"
                type="submit"
                color="success"
              >
                <span>{CALCULATE}</span>
              </LoadingButton>
            </div>
          </form>
        </section>
      )}
    </>
  );
  return content;
};

export default CalculateFractionStepTwo;
