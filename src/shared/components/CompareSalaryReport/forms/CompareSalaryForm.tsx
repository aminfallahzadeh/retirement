// IMPORTS
import { useState, useMemo } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Input } from "../../Input";
import { SelectInput } from "../../SelectInput";
import { LoadingModal } from "../../LoadingModal";
import { requiredRule, onlyNumbersRules, yearRules } from "@/constants/rules";
import { LoadingButton } from "@mui/lab";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import { ComparisonPayItem } from "../types";
import {
  SEARCH,
  CURRENT_YEAR,
  CURRENT_MONTH,
  PAY_ITEM_TYPE,
  PENSIONARY_TYPE,
} from "@/constants/const";
import { NO_OPTION_MESSAGE } from "@/constants/messages";
import {
  currentMonthOptions,
  pensionaryTypeOptions,
} from "@/constants/options";
import { useFetchPayItemType } from "@/hooks/useFetchLookUpData";
import { createOptions } from "@/utils/optionsCreator";
import { useLazyGetPayCompareReportQuery } from "@/features/report/reportApi";
import { toastConfig } from "@/config/toast";
import { separateByThousand } from "@/helpers/numberConverter";
import { CompareSalaryGrid } from "../sub/CompareSalaryGrid";

export const CompareSalaryForm = () => {
  // STATES
  const [data, setData] = useState<ComparisonPayItem[]>([]);

  // CONSTS
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const { payItemTypes, payItemTypesIsLoading, payItemTypesIsFetching } =
    useFetchPayItemType();
  const [getReport, { isLoading, isFetching }] =
    useLazyGetPayCompareReportQuery();

  const payItemTypeOptions = createOptions(
    payItemTypes,
    "payItemTypeID",
    "payItemTypeName"
  );

  // HANDLERS
  const onSubmit = async (data: FieldValues) => {
    const response = await getReport({
      ...data,
      CurrentMonth: data.CurrentMonth.value,
      PayItemTypeID: data.PayItemTypeID.value,
      pensionaryIsRetired: data.pensionaryIsRetired.value,
    }).unwrap();

    if (response.itemList.length === 0) {
      toastConfig.warning(NO_OPTION_MESSAGE);
      return;
    }

    const mappedData = response.itemList.map(
      (item: ComparisonPayItem, index: number) => ({
        id: item.personnelID,
        compareRowNum: index + 1,
        payNationalCode: item.personNationalCode || "-",
        payPersonID: item.personnelID || "-",
        payFirstName: item.personFirstName || "-",
        payLastName: item.personLastName || "-",
        payCurrentMonth: separateByThousand(item.currentpayItemAmount) || "-",
        payLastMonth: separateByThousand(item.prepayItemAmount) || "-",
        payDiff: separateByThousand(item.diffpay) || "-",
        payStatus: item.pensionaryStatusName || "-",
      })
    );

    setData(mappedData);
  };

  // MEMOIZE DATA
  const tableData = useMemo(() => data, [data]);

  const content = (
    <>
      <LoadingModal open={isLoading || isFetching} />
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
              name={"CurrentYear"}
              label={CURRENT_YEAR}
              required={true}
              control={control}
              type={"text"}
              rules={{ ...requiredRule, ...onlyNumbersRules, ...yearRules }}
            />

            <SelectInput
              name={"CurrentMonth"}
              control={control}
              label={CURRENT_MONTH}
              options={currentMonthOptions}
              required={true}
              rules={requiredRule}
              isClearable={true}
              errors={errors}
            />

            <SelectInput
              name={"PayItemTypeID"}
              control={control}
              label={PAY_ITEM_TYPE}
              options={payItemTypeOptions}
              required={true}
              isLoading={payItemTypesIsLoading || payItemTypesIsFetching}
              rules={requiredRule}
              isClearable={true}
              errors={errors}
            />

            <SelectInput
              name={"pensionaryIsRetired"}
              control={control}
              label={PENSIONARY_TYPE}
              options={pensionaryTypeOptions}
              required={true}
              rules={requiredRule}
              isClearable={true}
              errors={errors}
            />
          </div>

          {/* Submit Button */}
          <div className="flex-row mr-auto flex-center">
            <LoadingButton
              dir="ltr"
              type="submit"
              endIcon={<SearchIcon />}
              loading={isLoading || isFetching}
              variant="contained"
              color="success"
              sx={{ fontFamily: "IranYekan" }}
            >
              <span>{SEARCH}</span>
            </LoadingButton>
          </div>
        </form>

        <CompareSalaryGrid
          data={tableData}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      </section>
    </>
  );

  return content;
};
