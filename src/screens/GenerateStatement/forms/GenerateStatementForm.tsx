// IMPORTS
import { useMemo, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import DoneIcon from "@mui/icons-material/DoneOutlined";
import { Input } from "@/shared/components/Input";
import { DatePicker } from "@/shared/components/DatePicker";
import { TextArea } from "@/shared/components/TextArea";
import { SelectInput } from "@/shared/components/SelectInput";
import { useFetchRetirementStatementTypes } from "@/hooks/useFetchLookUpData";
import { createOptions } from "@/utils/optionsCreator";
import { requiredRule, onlyNumbersRules } from "@/constants/rules";
import { baseSalaryOptions } from "@/data/control";
import { convertToPersianDate } from "@/helpers/dateConverter";
import { processDataForRequest } from "@/utils/convertFormData";
import { dateKeys, selectKeys, intKeys } from "./schema";
import { toastConfig } from "@/config/toast";
import {
  useGenerateNewRetirementStatementMutation,
  useGetRecommendRunDateQuery,
} from "@/features/statement/statementApi";
import {
  RUN_DATE,
  STATEMENT_TYPE,
  SAVE,
  BASE_SALARY_AMOUNT_RAISE,
  SUPPLEMENTARY_AMOUNT_RAISE,
  STATEMENT_DESC,
} from "@/constants/const";

const GenerateStatementForm = () => {
  // STATES
  const [searchParams] = useSearchParams();

  // CONSTS
  const navigate = useNavigate();
  const personID = searchParams.get("personID");
  const requestID = searchParams.get("requestID");
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>();
  const { data: recommendedRunDate, isSuccess: recommendedRunDateIsSuccess } =
    useGetRecommendRunDateQuery(personID);
  const [generateStatement, { isLoading }] =
    useGenerateNewRetirementStatementMutation();

  const typeID = watch("retirementStatementTypeID");
  const { statementTypes, statementTypesIsLoading } =
    useFetchRetirementStatementTypes();
  const statementOptions = useMemo(
    () =>
      createOptions(
        statementTypes,
        "retirementStatementTypeID",
        "retirementStatementTypeName"
      ),
    [statementTypes]
  );

  // HANDLERS
  const onSubmit = async (data: FieldValues) => {
    // PROCESS DATA FOR SUBMIT
    const transformedData = processDataForRequest(
      data,
      selectKeys,
      dateKeys,
      intKeys,
      []
    );
    const response = await generateStatement({
      ...transformedData,
      personID,
      requestID,
    }).unwrap();
    toastConfig.success(response.message);
    navigate(-1);
  };

  // PROCESS DATA FOR VIEW
  useEffect(() => {
    if (recommendedRunDateIsSuccess) {
      setValue(
        "retirementStatementRunDate",
        convertToPersianDate(recommendedRunDate)
      );
    }
  }, [recommendedRunDateIsSuccess, setValue, recommendedRunDate]);

  // CONTENT
  const content = (
    <section className="flex-col mb-20">
      <form
        method="POST"
        className="flex-col formContainer"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Form Fields */}
        <div className="grid grid-cols-4">
          <SelectInput
            name="retirementStatementTypeID"
            control={control}
            label={STATEMENT_TYPE}
            required={true}
            isClearable={true}
            options={statementOptions}
            isLoading={statementTypesIsLoading}
            rules={requiredRule}
            errors={errors}
          />

          <DatePicker
            name="retirementStatementRunDate"
            label={RUN_DATE}
            control={control}
            errors={errors}
            rules={requiredRule}
            required={true}
            setValue={setValue}
          />
          {typeID?.value && baseSalaryOptions.includes(typeID?.value) && (
            <>
              <Input
                name="newAmount"
                label={BASE_SALARY_AMOUNT_RAISE}
                rules={onlyNumbersRules}
                required={false}
                control={control}
                type="text"
              />

              <Input
                name="newSup"
                label={SUPPLEMENTARY_AMOUNT_RAISE}
                rules={onlyNumbersRules}
                required={false}
                control={control}
                type="text"
              />
            </>
          )}

          <TextArea
            name="retirementStatementDesc"
            label={STATEMENT_DESC}
            control={control}
            containerClassNames="col-span-4 row-span-2"
          />
        </div>

        {/* Button Section */}
        <div className="flex-row mr-auto">
          <LoadingButton
            dir="ltr"
            endIcon={<DoneIcon />}
            variant="contained"
            type="submit"
            loading={isLoading}
            color="success"
          >
            <span>{SAVE}</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );
  return content;
};

export default GenerateStatementForm;
