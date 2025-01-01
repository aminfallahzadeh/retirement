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
  useLazyGetLookupParentQuery,
  useInsertLookupMutation,
} from "@/features/lookup/lookupApi";
import { OptionType } from "@/shared/types/options";
import { createOptions } from "@/utils/optionsCreator";
import { toastConfig } from "@/config/toast";
import { requiredRule } from "@/constants/rules";

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
    unregister,
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
    getParent,
    { isLoading: isParentLoading, isFetching: isParentFetching },
  ] = useLazyGetLookupParentQuery();

  const [insertLookup, { isLoading: isInsertLoading }] =
    useInsertLookupMutation();

  // HANDLERS
  const fetchLookUp = useCallback(async () => {
    const response = await getParent(form_data?.type?.value).unwrap();
    const options = createOptions(response.itemList, "id", "lookUpName");
    if (response.itemList.length === 0 && form_data?.type?.value) {
      unregister("parent");
    }
    setParentOptions(options);
  }, [getParent, form_data?.type?.value, unregister]);

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
            rules={requiredRule}
          />

          <SelectInput
            name="type"
            label="نوع"
            options={typeOptions}
            control={control}
            rules={requiredRule}
            required={true}
            isClearable={true}
            isLoading={isDistinctLoading}
            errors={errors}
          />

          {parentOptions && parentOptions.length > 0 && (
            <SelectInput
              name="parent"
              label="از مجموعه"
              rules={requiredRule}
              options={parentOptions}
              isLoading={isParentLoading || isParentFetching}
              control={control}
              required={true}
              isClearable={true}
              errors={errors}
            />
          )}

          <TextArea
            name="description"
            label="شرح"
            control={control}
            required={true}
            rules={requiredRule}
            containerClassNames={"col-span-3 row-span-2"}
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
