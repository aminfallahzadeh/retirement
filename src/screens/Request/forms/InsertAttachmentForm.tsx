// IMPORTS
import { useState, useRef, useMemo } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { createOptions } from "@/utils/optionsCreator";
import { LoadingButton } from "@mui/lab";
import UploadIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { SelectInput } from "@/shared/components/SelectInput";
import { TextArea } from "@/shared/components/TextArea";
import { useInsertRequestAttachmentMutation } from "@/features/request/requestApi";
import { useFetchRequestAttachmentTypes } from "@/hooks/useFetchLookUpData";
import { requiredRule } from "@/constants/rules";
import { SCAN, ATTACHMENT_TYPE, DESCRIPTION } from "@/constants/const";
import { toastConfig } from "@/config/toast";

const InsertAttachmentForm = ({
  refetch: refetch,
  closeModal,
}: {
  refetch: () => void;
  closeModal: () => void;
}) => {
  // STATES
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [searchParams] = useSearchParams();
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);

  // CONSTS
  const requestTypeID = searchParams.get("type");
  const requestID = searchParams.get("requestID");
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>();
  const form_data = watch();
  const [insertAttachment, { isLoading }] =
    useInsertRequestAttachmentMutation();
  const { requestAttachmentTypes, requestAttachmentTypesIsLoading } =
    useFetchRequestAttachmentTypes(requestTypeID as string);
  const attachmentTypesOptions = useMemo(
    () =>
      createOptions(requestAttachmentTypes, "requestTypeAttachmentID", "name"),
    [requestAttachmentTypes]
  );

  // HANDLERS
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    const contentType = file.type.split("/")[1];

    setIsFileUploading(true);
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(",")[1];

      const response = await insertAttachment({
        attachementTypeID: form_data.attachementTypeID.value,
        requestID,
        contentType,
        attachment: base64Data,
        attachementDesc: form_data.attachementDesc,
      }).unwrap();
      toastConfig.success(response.message);
      refetch();
      closeModal();
      setIsFileUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = () => {
    inputFileRef.current?.click();
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
        <input
          type="file"
          ref={inputFileRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
        />

        {/* Form Fields */}
        <div className="grid grid-cols-1 mb-10">
          <SelectInput
            name="attachementTypeID"
            control={control}
            label={ATTACHMENT_TYPE}
            required={true}
            isClearable={true}
            rules={requiredRule}
            isDisabled={isLoading}
            options={attachmentTypesOptions}
            errors={errors}
            isLoading={requestAttachmentTypesIsLoading}
          />

          <TextArea
            name="attachementDesc"
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
            endIcon={<UploadIcon />}
            variant="contained"
            color="primary"
            type="submit"
            disabled={isFileUploading}
            loading={isLoading}
          >
            <span>{SCAN}</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );

  return content;
};

export default InsertAttachmentForm;
