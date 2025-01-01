// IMPORTS
import { useEffect, useCallback, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/usePreTypesHooks";
import { setFractionData } from "@/features/fraction/fractionSlice";
import { useCalculateFractionFromStatementMutation } from "@/features/fraction/fractionApi";
import { Box, CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { separateByThousand } from "@/helpers/numberConverter";
import { CustomCheckBox } from "@/shared/components/CustomCheckBox";
import DoneIcon from "@mui/icons-material/Done";
import { Input } from "@/shared/components/Input";
import { toastConfig } from "@/config/toast";
import {
  FIRST_NAME,
  LAST_NAME,
  NATIONAL_CODE,
  PERSONNEL_NO,
  SAVE,
  INCLUDED_FRACTION_AMOUNT,
  MANAGER_PERCENT_SHARE,
  PERSONNEL_PERCENT_SHARE,
  MANAGER_SHARE,
  PERSONNEL_SHARE,
  REMAINING_DEBT,
  REMAINING_CREDIT,
  INSTALLMENT,
  INSTALLMENT_AMOUNT,
  INSTALLMENT_COUNT,
} from "@/constants/const";

const CalculateFractionStepThree = () => {
  // STATES
  const [calculatedData, setCalculatedData] = useState<FieldValues>({});

  // CONSTS
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { fractionData: stepTwoData } = useAppSelector(
    (state) => state.fraction
  );
  const { control, handleSubmit, setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      personNationalCode: stepTwoData?.personNationalCode,
      personFirstName: stepTwoData?.personFirstName,
      personLastName: stepTwoData?.personLastName,
      personnelID: stepTwoData?.personnelID,
    },
  });
  const installment = watch("installment");
  const installmentAmount = watch("installmentAmount");
  const [calculateFraction, { isLoading }] =
    useCalculateFractionFromStatementMutation();

  // HANDLERS
  const fetchCalculation = useCallback(
    async (save: boolean = false, numberOfInstallments: number = 0) => {
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
        personNationalCode: stepTwoData?.personNationalCode,
        personnelStatementOffTypeID: stepTwoData?.statementType?.value || "0",
        organizationID: stepTwoData?.organizationID?.value || "0",
        numberOfInstallments,
        personnelStatementSerialNO: parseInt(stepTwoData?.serial),
        startYearDelay: parseInt(stepTwoData?.startYearDelay) || 0,
        startMonthDelay: parseInt(stepTwoData?.startMonthDelay) || 0,
        startDayDelay: parseInt(stepTwoData?.startDayDelay) || 0,
        endYearDelay: parseInt(stepTwoData?.endYearDelay) || 0,
        endMonthDelay: parseInt(stepTwoData?.endMonthDelay) || 0,
        endDayDelay: parseInt(stepTwoData?.endDayDelay) || 0,
        transportedPay: parseInt(stepTwoData?.transportedPay) || 0,
        periods: null,
        save,
      }).unwrap();

      if (!save) {
        const data = response?.itemList[0];

        setCalculatedData(data);

        Object.keys(data).forEach((key) => {
          if (typeof data[key] === "number") {
            setValue(key, separateByThousand(data[key]));
          } else {
            setValue(key, data[key]);
          }
        });
      } else {
        dispatch(setFractionData(null));
        toastConfig.success(response.message);
        navigate("/retirement/fraction/calculate/1");
      }
    },
    [calculateFraction, stepTwoData, setValue, dispatch, navigate]
  );

  useEffect(() => {
    if (stepTwoData) {
      fetchCalculation();
    } else {
      navigate("/retirement/fraction/calculate/1", { replace: true });
    }
  }, [stepTwoData, fetchCalculation, navigate]);

  useEffect(() => {
    if (
      installmentAmount &&
      calculatedData &&
      !isNaN(parseFloat(installmentAmount)) &&
      parseFloat(installmentAmount) !== 0
    ) {
      const count = (
        calculatedData.debtor / parseFloat(installmentAmount)
      ).toFixed(0);
      setValue("numberOfInstallments", count);
    } else {
      setValue("numberOfInstallments", "");
    }
  }, [installmentAmount, calculatedData, setValue]);

  const onSubmit = (data: FieldValues) => {
    fetchCalculation(true, parseInt(data.numberOfInstallments));
  };

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
                name="organizationPercent"
                label={MANAGER_PERCENT_SHARE}
                editable={false}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="personnelPercent"
                label={PERSONNEL_PERCENT_SHARE}
                editable={false}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="sumFractionOrganization"
                label={MANAGER_SHARE}
                editable={false}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="sumFractionPersonnel"
                label={PERSONNEL_SHARE}
                editable={false}
                required={false}
                control={control}
                type="text"
              />
              <Input
                name="debtor"
                label={REMAINING_DEBT}
                editable={false}
                required={false}
                control={control}
                type="text"
              />
              <Input
                name="credit"
                label={REMAINING_CREDIT}
                editable={false}
                required={false}
                control={control}
                type="text"
              />

              <div />
              <CustomCheckBox
                name="installment"
                label={INSTALLMENT}
                control={control}
              />

              {installment && (
                <>
                  <Input
                    name="installmentAmount"
                    label={INSTALLMENT_AMOUNT}
                    control={control}
                    type="text"
                  />

                  <Input
                    name="numberOfInstallments"
                    label={INSTALLMENT_COUNT}
                    editable={false}
                    required={false}
                    control={control}
                    type="text"
                  />
                </>
              )}
            </div>

            {/* Button Section */}
            <div className="flex-row ml-auto">
              <LoadingButton
                dir="ltr"
                endIcon={<DoneIcon />}
                variant="contained"
                loading={isLoading}
                type="submit"
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

export default CalculateFractionStepThree;
