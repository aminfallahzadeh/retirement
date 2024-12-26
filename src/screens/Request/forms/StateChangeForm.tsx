// IMPORTS
import { useState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { OptionType } from "@/shared/types/options";
import { SelectInput } from "@/shared/components/SelectInput";
import { TextArea } from "@/shared/components/TextArea";
import { LoadingButton } from "@mui/lab";
import DoneIcon from "@mui/icons-material/Done";
import {
  useGetExpertQuery,
  useSendRequestToNextStateMutation,
} from "@/features/request/requestApi";
import { createOptions } from "@/utils/optionsCreator";
import { requiredRule } from "@/constants/rules";
import { toastConfig } from "@/config/toast";
import { CARTABLE_URL } from "@/constants/urls";
import { EXPERT, DESCRIPTION, CONFIRM } from "@/constants/const";

const StateChangeForm = ({ conditionValue }: { conditionValue: number }) => {
  // STATES
  const [searchParams] = useSearchParams();
  const [expertOptions, setExpertOptions] = useState<OptionType[]>([]);

  // CONSTS
  const navigate = useNavigate();
  const RequestID = searchParams.get("requestID");
  const Role = searchParams.get("Role");
  const requestTypeID = searchParams.get("type");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const [sendRequest, { isLoading }] = useSendRequestToNextStateMutation();
  const {
    data,
    isSuccess,
    isLoading: isExpertsLoading,
  } = useGetExpertQuery({ RequestID, conditionValue, Role });

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      const expertsItems = data.itemList;
      const options = () => createOptions(expertsItems, "userID", "lastName");
      setExpertOptions(options);
    }
  }, [isSuccess, data]);

  const onSubmit = async (data: FieldValues) => {
    const response = await sendRequest({
      ...data,
      requestid: RequestID,
      conditionValue,
      requestTypeID,
      role: Role,
      expertUserID: data.expertUserID.value,
    }).unwrap();
    toastConfig.success(response.message);
    navigate(CARTABLE_URL, { replace: true });
  };

  // CONTENT
  const content = (
    <section className="flex-col">
      <form
        method="POST"
        className="flex-col"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Form Fields */}
        <div className="grid grid-cols-1 mb-10">
          <SelectInput
            name="expertUserID"
            control={control}
            label={EXPERT}
            required={true}
            isClearable={true}
            rules={requiredRule}
            isDisabled={isLoading}
            options={expertOptions}
            errors={errors}
            isLoading={isExpertsLoading}
          />

          <TextArea
            name="description"
            label={DESCRIPTION}
            required={true}
            rules={requiredRule}
            editable={!isLoading}
            control={control}
            containerClassNames={"row-span-2"}
          />
        </div>

        {/* Submit Section */}
        <div className="flex-row mr-auto">
          <LoadingButton
            dir="ltr"
            endIcon={<DoneIcon />}
            variant="contained"
            color="success"
            type="submit"
            disabled={isLoading}
            loading={isLoading}
          >
            <span>{CONFIRM}</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );
  return content;
};

export default StateChangeForm;
