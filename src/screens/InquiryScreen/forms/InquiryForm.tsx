// IMPORTS
import { useForm, FieldValues } from "react-hook-form";
import { Input } from "@/shared/components/Input";
import { DatePicker } from "@/shared/components/DatePicker";
import { LoadingButton } from "@mui/lab";
import DoneIcon from "@mui/icons-material/DoneOutlined";
import { requiredRule, nationalCodeRules } from "@/constants/rules";
import InquiryResultForm from "./InquiryResultForm";
import {
  NATIONAL_CODE,
  BIRTH_DATE,
  FATHER_NAME,
  INQUIRY,
} from "@/constants/const";

export const InquiryForm = () => {
  // STATES

  // CONSTS
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>();

  // HANDLERS
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
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
        <div className="grid grid-cols-4">
          <Input
            name="personNationalCode"
            label={NATIONAL_CODE}
            rules={{ ...requiredRule, ...nationalCodeRules }}
            required={true}
            control={control}
            type="text"
          />

          <DatePicker
            name="personBirthDate"
            label={BIRTH_DATE}
            control={control}
            required={true}
            errors={errors}
            rules={requiredRule}
            setValue={setValue}
          />

          <Input
            name="personFatherName"
            label={FATHER_NAME}
            rules={requiredRule}
            required={true}
            control={control}
            type="text"
          />
        </div>

        {/* Button Section */}
        <div className="flex-row mr-auto">
          <LoadingButton
            dir="ltr"
            endIcon={<DoneIcon />}
            variant="contained"
            type="submit"
            color="success"
          >
            <span>{INQUIRY}</span>
          </LoadingButton>
        </div>
      </form>

      <InquiryResultForm isLoading={false} isFetching={false} data={[]} />
    </section>
  );
  return content;
};
