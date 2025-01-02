// IMPORTS
import { useForm, FieldValues } from "react-hook-form";
import { Input } from "@/shared/components/Input";
import { LoadingButton } from "@mui/lab";
import DoneIcon from "@mui/icons-material/DoneOutlined";
import { BaseInfoOrganizationGrid } from "../components/BaseInfoOrganizationGrid";
import { CustomCheckBox } from "@/shared/components/CustomCheckBox";
import { requiredRule } from "@/constants/rules";
import { ORGANIZATION_NAME, SAVE, ACTIVE } from "@/constants/const";

const BaseOrganizationForm = () => {
  // STATES
  // CONSTS
  const { control, handleSubmit } = useForm<FieldValues>();

  // HANDLERS
  const onSubmit = (data: FieldValues) => {
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
            name="organizationName"
            label={ORGANIZATION_NAME}
            rules={requiredRule}
            required={true}
            control={control}
            type="text"
          />

          <CustomCheckBox control={control} label={ACTIVE} name="isActive" />
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
            <span>{SAVE}</span>
          </LoadingButton>
        </div>
      </form>

      <BaseInfoOrganizationGrid />
    </section>
  );
  return content;
};

export default BaseOrganizationForm;
