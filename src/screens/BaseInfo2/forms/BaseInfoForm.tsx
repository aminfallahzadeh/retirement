// IMPORTS
import { useForm, FieldValues } from "react-hook-form";
import { Save as SaveIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Input } from "@/shared/components/Input";
import { SelectInput } from "@/shared/components/SelectInput";
import { TextArea } from "@/shared/components/TextArea";

export const BaseInfoForm = () => {
  // CONSTS
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const testOptions = [
    { value: "test1", label: "test1" },
    { value: "test2", label: "test2" },
    { value: "test3", label: "test3" },
  ];

  const content = (
    <section className="flex-col formContainer">
      <form
        method="POST"
        className="flex-col"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="grid grid--col-3">
          <Input
            name="title"
            label="عنوان"
            control={control}
            rules={{
              required: {
                value: true,
                message: "این فیلد اجباری است",
              },
            }}
          />

          <SelectInput
            name="type"
            label="نوع"
            options={testOptions}
            control={control}
            required={true}
            isClearable={true}
            errors={errors}
            rules={{
              required: {
                value: true,
                message: "این فیلد اجباری است",
              },
            }}
          />

          <SelectInput
            name="fromGroup"
            label="از مجموعه"
            options={testOptions}
            control={control}
            required={false}
            isClearable={true}
          />

          <TextArea
            name="description"
            label="شرح"
            control={control}
            colSpan="col-span-2"
            rowSpan="row-span-2"
          />
        </div>

        <div className="flex mr-auto">
          <LoadingButton
            dir="ltr"
            endIcon={<SaveIcon />}
            variant="contained"
            type="submit"
            color="success"
            sx={{ fontFamily: "sahel" }}
          >
            <span>ذخیره</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );

  return content;
};
