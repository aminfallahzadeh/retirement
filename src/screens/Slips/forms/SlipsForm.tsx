// IMPORTS
import { useEffect, useState, useCallback } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { SlipsGrid } from "../components";
import { SelectInput } from "@/shared/components/SelectInput";
import { LoadingButton } from "@mui/lab";
import ExportIcon from "@mui/icons-material/ImportExportOutlined";
import EyeIcon from "@mui/icons-material/VisibilityOutlined";
import { Slip } from "../types";
import {
  useLazyExistPaySlipQuery,
  useLazyGetPayListQuery,
} from "@/features/pay/payApi";
import {
  ISSUE_TYPE,
  PAY_TYPE,
  PAY_YEAR,
  PAY_MONTH,
  ISSUE,
  OBSERVE,
} from "@/constants/const";
import { requiredRule } from "@/constants/rules";
import {
  issueTypeOptions,
  payTypeOptions,
  currentYearOptions,
  currentMonthOptions,
} from "@/constants/options";

export const SlipsForm = () => {
  // STATES
  const [isSlipExists, setIsSlipExists] = useState<boolean>(false);
  const [data, setData] = useState<Slip[]>([]);
  const [searchParams] = useSearchParams();

  // CONSTS
  const personID = searchParams.get("personID");
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      issueType: personID ? issueTypeOptions[1] : issueTypeOptions[0],
      payType: payTypeOptions[0],
    },
  });
  const form_data = watch();
  const [existPaySlip, { isLoading: isChecking }] = useLazyExistPaySlipQuery();
  const [
    getPayList,
    { isLoading: isGettingPayList, isFetching: isFetchingPayList },
  ] = useLazyGetPayListQuery();

  // HANDLERS
  const onSubmit = async (data: FieldValues) => {
    if (isSlipExists) {
      const response = await getPayList({
        currentYear: parseInt(data.currentYear.value),
        currentMonth: parseInt(data.currentMonth.value),
        payType: data.payType.value,
        personID,
      }).unwrap();
      const mappedData = response.itemList.map((item: Slip, index: number) => ({
        id: item.payID,
        slipRowNum: index + 1,
        personID: item.personID,
        slipFirstName: item.payFirstName,
        slipLastName: item.payLastName,
        slipAccountNo: item.accountNo,
        slipPayDebitAmount: item.payDebitAmount,
        slipPayCreditAmount: item.payCreditAmount,
        slipPayAmount: item.payAmount,
        slipPayDate: item.payDate,
      }));
      setData(mappedData);
    } else {
      return;
    }
  };

  const slipChecker = useCallback(
    async ({
      payType,
      currentYear,
      currentMonth,
    }: {
      payType: string;
      currentYear: string;
      currentMonth: string;
    }) => {
      try {
        const res = await existPaySlip({
          payType,
          currentYear: parseInt(currentYear),
          currentMonth: parseInt(currentMonth),
        }).unwrap();
        setIsSlipExists(res);
      } catch (err) {
        console.log(err);
      }
    },
    [existPaySlip]
  );

  useEffect(() => {
    if (form_data.payType && form_data.currentYear && form_data.currentMonth) {
      slipChecker({
        payType: form_data.payType.value,
        currentYear: form_data.currentYear.value,
        currentMonth: form_data.currentMonth.value,
      });
    }
  }, [
    slipChecker,
    form_data.payType,
    form_data.currentYear,
    form_data.currentMonth,
  ]);

  const content = (
    <section className="flex-col formContainer">
      <form
        method="POST"
        className="flex-col"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Form Fields */}
        <div className="grid grid-cols-4">
          <SelectInput
            name="issueType"
            control={control}
            label={ISSUE_TYPE}
            options={issueTypeOptions}
            required={false}
            isClearable={false}
            isDisabled={true}
            errors={errors}
          />

          <SelectInput
            name="payType"
            control={control}
            label={PAY_TYPE}
            options={payTypeOptions}
            required={true}
            isClearable={false}
            errors={errors}
          />

          <SelectInput
            name="currentYear"
            control={control}
            label={PAY_YEAR}
            options={currentYearOptions}
            required={true}
            rules={requiredRule}
            isClearable={true}
            errors={errors}
          />

          <SelectInput
            name="currentMonth"
            control={control}
            label={PAY_MONTH}
            options={currentMonthOptions}
            required={true}
            rules={requiredRule}
            isClearable={true}
            errors={errors}
          />
        </div>

        {/* Submit Button */}
        <div className="flex-row mr-auto flex-center">
          {isSlipExists === true && (
            <LoadingButton
              dir="ltr"
              endIcon={<EyeIcon />}
              loading={isChecking}
              type="submit"
              variant="contained"
              color="primary"
            >
              <span>{OBSERVE}</span>
            </LoadingButton>
          )}
          <LoadingButton
            dir="ltr"
            endIcon={<ExportIcon />}
            type="submit"
            loading={isChecking}
            disabled={isSlipExists}
            variant="contained"
            color="primary"
          >
            <span>{ISSUE}</span>
          </LoadingButton>
        </div>
      </form>

      <SlipsGrid
        data={data}
        isLoading={isGettingPayList}
        isFetching={isFetchingPayList}
      />
    </section>
  );
  return content;
};
