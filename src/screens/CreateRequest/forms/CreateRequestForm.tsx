// IMPORTS
import { useEffect, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetRequestTypeQuery } from "@/features/request/requestApi";
import { useInsertRequestByNationalCodeMutation } from "@/features/request/requestApi";
import { LoadingButton } from "@mui/lab";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import {
  SEND_REQUEST,
  REQUEST_TYPE,
  NATIONAL_CODE,
  DESCRIPTION,
} from "@/constants/const";
import { OptionType } from "@/shared/types/options";
import { createOptions } from "@/utils/optionsCreator";
import { SelectInput } from "@/shared/components/SelectInput";
import { Input } from "@/shared/components/Input";
import { TextArea } from "@/shared/components/TextArea";
import { requiredRule, nationalCodeRules } from "@/constants/rules";
import { convertToEnglishNumber } from "@/helpers/numberConverter";
import { toastConfig } from "@/config/toast";
import { groupRequestTypeIDs } from "./data";

export const CreateRequestForm = () => {
  // STATES
  const [searchParams] = useSearchParams();
  const [requestOptions, setRequestOptions] = useState<OptionType[]>([]);

  // CONSTS
  const navigate = useNavigate();
  const role = searchParams.get("role");
  const {
    data: requestTypes,
    isLoading: isRequestTypesLoading,
    isSuccess: isRequestTypesSuccess,
  } = useGetRequestTypeQuery(role);
  const [insertRequest, { isLoading: isInserting }] =
    useInsertRequestByNationalCodeMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    unregister,
  } = useForm<FieldValues>();
  const selectedRequestTypeID = watch("requestTypeID");

  // HANDLERS
  useEffect(() => {
    if (isRequestTypesSuccess) {
      const data = requestTypes.itemList;
      const options = createOptions(data, "requestTypeID", "name");
      setRequestOptions(options);
    }
  }, [isRequestTypesSuccess, requestTypes]);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const response = await insertRequest({
      ...data,
      requestTypeID: data.requestTypeID?.value,
      requestFrom: 1,
      nationalCode: convertToEnglishNumber(data.nationalCode),
    }).unwrap();
    toastConfig.success(response.message);
    navigate("/retirement/cartable");
  };

  // EFFECTS
  useEffect(() => {
    if (selectedRequestTypeID) {
      if (groupRequestTypeIDs.includes(selectedRequestTypeID?.value)) {
        unregister("nationalCode");
      }
    }
  }, [selectedRequestTypeID, unregister]);

  const content = (
    <section className="formContainer flex-col">
      <form
        method="POST"
        className="flex-col"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Form Fields */}
        <div className="grid grid-cols-4">
          <SelectInput
            name="requestTypeID"
            control={control}
            label={REQUEST_TYPE}
            required={false}
            isClearable={true}
            rules={requiredRule}
            errors={errors}
            options={requestOptions}
            isLoading={isRequestTypesLoading}
          />

          {!groupRequestTypeIDs.includes(selectedRequestTypeID?.value) && (
            <Input
              name="nationalCode"
              label={NATIONAL_CODE}
              required={true}
              control={control}
              rules={{ ...requiredRule, ...nationalCodeRules }}
              type={"text"}
            />
          )}

          <TextArea
            name="requestText"
            label={DESCRIPTION}
            rules={requiredRule}
            required={true}
            control={control}
            containerClassNames={"col-span-4 row-span-2"}
          />
        </div>

        {/* Button Section */}
        <div className="flex-row mr-auto">
          <LoadingButton
            dir="ltr"
            endIcon={<DoneOutlinedIcon />}
            variant="contained"
            type="submit"
            loading={isInserting}
            color="success"
          >
            <span>{SEND_REQUEST}</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );
  return content;
};
