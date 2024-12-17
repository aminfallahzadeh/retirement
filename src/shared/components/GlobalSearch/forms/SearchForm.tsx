// IMPORTS
import { useState, useMemo } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useLazyGetPersonsQuery } from "@/features/person/personApi";
import { toastConfig } from "@/config/toast";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import { LoadingButton } from "@mui/lab";
import { Input } from "@/shared/components/Input";
import { ResultGrid } from "../sub/ResultGrid";
import {
  NATIONAL_CODE,
  PERSONNEL_NO,
  FIRST_NAME,
  LAST_NAME,
  SEARCH,
} from "@/constants/const";
import { NO_RESULT_FOUND } from "@/constants/messages";
import { onlyNumbersRules, onlyPersianAlphabetsRules } from "@/constants/rules";
import { PersonnelTableData, Personnel } from "../types";
import { convertToEnglishNumber } from "@/helpers/numberConverter";

export const SearchForm = () => {
  // STATES
  const [data, setData] = useState<PersonnelTableData>([]);

  // CONSTS
  const { control, handleSubmit, watch, reset } = useForm<FieldValues>();
  const form_data = watch();
  const [searchPersonnel, { isLoading, isFetching }] = useLazyGetPersonsQuery();

  const disabledButton = useMemo(() => {
    return (
      !form_data.personNationalCode &&
      !form_data.personnelID &&
      !form_data.personFirstName &&
      !form_data.personLastName
    );
  }, [form_data]);

  // HANDLERS
  const onSubmit = async (data: FieldValues) => {
    const response = await searchPersonnel({
      ...data,
      personnelID: convertToEnglishNumber(data.personnelID),
      personNationalCode: convertToEnglishNumber(data.personNationalCode),
    }).unwrap();

    if (response.itemList.length === 0) {
      toastConfig.warning(NO_RESULT_FOUND);
      reset();
      return;
    }

    const mappedData = response.itemList.map(
      (item: Personnel, index: number) => ({
        id: item.personID,
        personnelRowNo: index + 1,
        personnelDeathDate: item.personDeathDate,
        personnelID: item.personnelID,
        personnelNationalCode: item.personNationalCode,
        personnelFirstName: item.personFirstName,
        personnelLastName: item.personLastName,
      })
    );

    setData(mappedData);
  };

  // MEMOIZE DATA
  const tableData = useMemo(() => data, [data]);

  const content = (
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
            name={"personNationalCode"}
            label={NATIONAL_CODE}
            rules={onlyNumbersRules}
            control={control}
            required={false}
            type={"text"}
          />

          <Input
            name={"personnelID"}
            label={PERSONNEL_NO}
            rules={onlyNumbersRules}
            control={control}
            required={false}
            type={"text"}
          />

          <Input
            name={"personFirstName"}
            label={FIRST_NAME}
            rules={onlyPersianAlphabetsRules}
            control={control}
            required={false}
            type={"text"}
          />

          <Input
            name={"personLastName"}
            label={LAST_NAME}
            rules={onlyPersianAlphabetsRules}
            control={control}
            required={false}
            type={"text"}
          />
        </div>

        {/* Button Section */}
        <div className="flex-row mr-auto">
          <LoadingButton
            dir="ltr"
            endIcon={<SearchIcon />}
            loading={isLoading || isFetching}
            disabled={disabledButton}
            variant="contained"
            color="primary"
            type="submit"
          >
            <span>{SEARCH}</span>
          </LoadingButton>
        </div>
      </form>

      <ResultGrid
        data={tableData}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </section>
  );
  return content;
};
