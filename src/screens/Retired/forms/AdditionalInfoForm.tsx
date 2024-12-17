// IMPORTS
import { useEffect, useMemo, useState, useCallback } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import useToggleState from "@/hooks/useToggleState";
import { useFetchLookUpData } from "@/hooks/useFetchLookUpData";
import { useLazyGetLookupDataQuery } from "@/features/shared/sharedApi";
import {
  useUpdateRetiredAccountMutation,
  useGetRetiredAccountQuery,
} from "@/features/retired/retiredApi";
import { convertToEnglishNumber } from "@/helpers/numberConverter";
import { Input } from "@/shared/components/Input";
import { SelectInput } from "@/shared/components/SelectInput";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress } from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { BankBranch } from "../types";
import { createOptions } from "@/utils/optionsCreator";
import { onlyNumbersRules } from "@/constants/rules";
import { toastConfig } from "@/config/toast";
import { processDataForRequest } from "@/utils/convertFormData";
import {
  BANK,
  SAVE,
  EDIT,
  BANK_BRANCH,
  ACCOUNT_NO,
  LEDGER_CODE,
  INSURANCE_COEF,
  INSURANCE_AMOUNT,
} from "@/constants/const";

export const AdditionalInfoForm = () => {
  // STATES
  const [editable, toggleEditable] = useToggleState(false);
  const [bankBranchItems, setBankBranchItems] = useState<BankBranch[]>([]);

  // CONSTS
  const [searchParams] = useSearchParams();
  const personID = searchParams.get("personID");
  const selectKeys = useMemo(() => ["bankID", "bankBranchID"], []);
  const dateKeys = useMemo(() => [], []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>();
  const bankOption = watch("bankID");
  const { lookUpItems: bankItems, lookUpItemsIsLoading: bankItemsIsLoading } =
    useFetchLookUpData({ lookUpType: "Bank" });
  const bankOptions = useMemo(
    () => createOptions(bankItems, "lookUpID", "lookUpName"),
    [bankItems]
  );
  const [
    getLookupData,
    {
      isLoading: isBankBranchComboLoading,
      isFetching: isBankBranchComboFetching,
    },
  ] = useLazyGetLookupDataQuery();
  const bankBranchOptions = useMemo(
    () => createOptions(bankBranchItems, "lookUpID", "lookUpName"),
    [bankBranchItems]
  );

  const {
    data: retiredAccountData,
    isSuccess,
    isLoading,
    isFetching,
    refetch,
  } = useGetRetiredAccountQuery(personID);
  const [updateRetiredAccount, { isLoading: isUpdating }] =
    useUpdateRetiredAccountMutation();

  // HANDLERS
  const fetchBankBranch = useCallback(
    async (id: string) => {
      const response = await getLookupData({
        lookUpType: "BankBranch",
        lookUpParentID: id,
      }).unwrap();
      setBankBranchItems(response.itemList);
    },
    [getLookupData]
  );

  const onSubmit = async (data: FieldValues) => {
    // CONVERT DATA FOR REQUEST
    const transformedData = processDataForRequest(data, selectKeys, dateKeys);

    const response = await updateRetiredAccount({
      ...transformedData,
      accountNo: convertToEnglishNumber(data.accountNo) || null,
      ledgerCode: parseInt(convertToEnglishNumber(data.ledgerCode)) || null,
      insuranceAmount:
        parseFloat(convertToEnglishNumber(data.insuranceAmount)) || null,
      insuranceCoef:
        parseFloat(convertToEnglishNumber(data.insuranceCoef)) || null,
      personID,
    }).unwrap();
    refetch();
    toggleEditable();
    toastConfig.success(response.message);
  };

  useEffect(() => {
    if (bankOption) {
      fetchBankBranch(bankOption.value);
    } else {
      setValue("bankBranchID", null);
      setBankBranchItems([]);
    }
  }, [bankOption, fetchBankBranch, setValue]);

  // CONVERT DATA FOR VIEW
  useEffect(() => {
    if (isSuccess) {
      const data = { ...retiredAccountData };

      delete data.bankID;
      delete data.bankBranchID;

      Object.keys(retiredAccountData).forEach((key) => {
        if (retiredAccountData[key] === null) {
          setValue(key, "");
        } else {
          setValue(key, retiredAccountData[key]);
        }
      });
    }
  }, [isSuccess, retiredAccountData, setValue]);

  useEffect(() => {
    if (isSuccess && bankOptions.length > 0) {
      setValue(
        "bankID",
        bankOptions.find((item) => item.value === retiredAccountData.bankID)
      );
    }
  }, [isSuccess, retiredAccountData, setValue, bankOptions]);

  useEffect(() => {
    if (isSuccess && bankBranchOptions.length > 0) {
      setValue(
        "bankBranchID",
        bankBranchOptions.find(
          (item) => item.value === retiredAccountData.bankBranchID
        )
      );
    }
  }, [isSuccess, retiredAccountData, setValue, bankBranchOptions]);

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
              <SelectInput
                name="bankID"
                control={control}
                label={BANK}
                required={false}
                isClearable={true}
                isDisabled={!editable}
                options={bankOptions}
                isLoading={bankItemsIsLoading}
                errors={errors}
              />

              <SelectInput
                name="bankBranchID"
                control={control}
                label={BANK_BRANCH}
                required={false}
                isClearable={true}
                isDisabled={!editable}
                options={bankBranchOptions}
                isLoading={
                  isBankBranchComboLoading || isBankBranchComboFetching
                }
                errors={errors}
              />

              <Input
                name="accountNo"
                label={ACCOUNT_NO}
                rules={onlyNumbersRules}
                required={false}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="ledgerCode"
                label={LEDGER_CODE}
                rules={onlyNumbersRules}
                required={false}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="insuranceCoef"
                label={INSURANCE_COEF}
                rules={onlyNumbersRules}
                required={false}
                control={control}
                editable={editable}
                type="text"
              />

              <Input
                name="insuranceAmount"
                label={INSURANCE_AMOUNT}
                rules={onlyNumbersRules}
                required={false}
                control={control}
                editable={editable}
                type="text"
              />
            </div>

            {/* Button Section */}
            <div className="flex-row mr-auto">
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
