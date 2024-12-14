// IMPORTS
import { useState, useEffect, useCallback } from "react";
import { useForm, FieldValues } from "react-hook-form";
import DoneIcon from "@mui/icons-material/Done";
import { LoadingButton } from "@mui/lab";
import { Input } from "@/shared/components/Input";
import { SelectInput } from "@/shared/components/SelectInput";
import { TextArea } from "@/shared/components/TextArea";
import {
  useGetLookupDistinctQuery,
  useLazyGetLookupQuery,
  useInsertLookupMutation,
} from "@/features/lookup/lookupApi";
import { OptionType } from "@/shared/types/options";
import { createOptions } from "@/utils/optionsCreator";
import { toastConfig } from "@/config/toast";

export const BaseInfoForm = () => {
  // STATES
  const [typeOptions, setTypeOptions] = useState<OptionType[]>([]);
  const [parentOptions, setParentOptions] = useState<OptionType[]>([]);

  // CONSTS
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      type: null,
      parent: null,
      description: "",
    },
  });

  const form_data = watch();

  const {
    data: distinct,
    isLoading: isDistinctLoading,
    isSuccess: isDistinctSuccess,
  } = useGetLookupDistinctQuery();

  const [
    getLookUp,
    { isLoading: isLookUpLoading, isFetching: isLookUpFetching },
  ] = useLazyGetLookupQuery();

  const [insertLookup, { isLoading: isInsertLoading }] =
    useInsertLookupMutation();

  // HANDLERS
  const fetchLookUp = useCallback(async () => {
    const response = await getLookUp({
      lookupType: form_data?.type?.value,
    }).unwrap();
    const options = createOptions(response.itemList, "lookUpID", "lookUpName");
    setParentOptions(options);
    console.log(response);
  }, [getLookUp, form_data?.type?.value]);

  const onSubmit = async (formData: FieldValues) => {
    const data = {
      lookUpID: "string",
      lookUpType: formData.type?.value,
      lookUpTypeName: formData.type?.label,
      lookUpName: formData.title,
      lookUpParentID: formData.parent?.value || "",
      lookUpDescription: formData.description,
      lookUpParentIDName: formData.parent?.label || "",
      isDeleted: false,
    };

    const response = await insertLookup(data).unwrap();
    toastConfig.success(response.message);
    reset();
  };

  useEffect(() => {
    if (isDistinctSuccess) {
      const options = createOptions(
        distinct.itemList,
        "lookUpType",
        "lookUpTypeName"
      );

      setTypeOptions(options);
    }
  }, [distinct?.itemList, isDistinctSuccess]);

  useEffect(() => {
    // fetch parent on type change
    if (form_data?.type?.value) {
      fetchLookUp();
    } else {
      setValue("parent", null);
      setParentOptions([]);
    }
  }, [form_data?.type?.value, fetchLookUp, setValue]);

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
            required={true}
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
            options={typeOptions}
            control={control}
            required={true}
            isClearable={true}
            isLoading={isDistinctLoading}
            errors={errors}
            rules={{
              required: {
                value: true,
                message: "این فیلد اجباری است",
              },
            }}
          />

          <SelectInput
            name="parent"
            label="از مجموعه"
            options={parentOptions}
            isLoading={isLookUpLoading || isLookUpFetching}
            control={control}
            required={false}
            isClearable={true}
          />

          <TextArea
            name="description"
            label="شرح"
            control={control}
            required={true}
            containerClassNames={"col-span-2 row-span-2"}
          />
        </div>

        <div className="flex mr-auto">
          <LoadingButton
            dir="ltr"
            endIcon={<DoneIcon />}
            loading={isInsertLoading}
            variant="contained"
            type="submit"
            color="success"
          >
            <span>ذخیره</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );

  return content;
};
