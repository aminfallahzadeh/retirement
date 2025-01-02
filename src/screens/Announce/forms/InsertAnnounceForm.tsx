// IMPORTS
import { useForm, FieldValues } from "react-hook-form";
import { Input } from "@/shared/components/Input";
import { DatePicker } from "@/shared/components/DatePicker";
import { requiredRule } from "@/constants/rules";
import { TextArea } from "@/shared/components/TextArea";
import { LoadingButton } from "@mui/lab";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { useInsertAnnounceMutation } from "@/features/announce/announceApi";
import { processDataForRequest } from "@/utils/convertFormData";
import { toastConfig } from "@/config/toast";
import { AnnounceGrid } from "../components/AnnounceGrid";
import useToggleState from "@/hooks/useToggleState";
import { TITLE, DATE, ANNOUNCE_DESCRIPTION, SAVE } from "@/constants/const";

export const InsertAnnounceForm = () => {
  // STATES
  const [refetch, toggleRefetch] = useToggleState(false);

  // CONSTS
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>();
  const [insertAnnounce, { isLoading }] = useInsertAnnounceMutation();

  // HANDLERS
  const onSubmit = async (data: FieldValues) => {
    // PROCESS DATA FOR REQUEST
    const transformedData = processDataForRequest(
      data,
      [],
      ["runDate"],
      [],
      []
    );
    const response = await insertAnnounce({
      ...transformedData,
      runDate: transformedData.runDate,
      isDelete: false,
    }).unwrap();
    toggleRefetch();
    toastConfig.success(response.message);
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
        <div className="grid grid-cols-3">
          <Input
            name="title"
            label={TITLE}
            rules={requiredRule}
            required={true}
            control={control}
            type="text"
          />

          <DatePicker
            name="runDate"
            label={DATE}
            control={control}
            required={true}
            errors={errors}
            rules={requiredRule}
            setValue={setValue}
          />

          <TextArea
            name="description"
            label={ANNOUNCE_DESCRIPTION}
            required={true}
            rules={requiredRule}
            control={control}
            containerClassNames={"col-span-3 row-span-2"}
          />
        </div>

        {/* Button Section */}
        <div className="flex-row mr-auto">
          <LoadingButton
            dir="ltr"
            endIcon={<DoneOutlinedIcon />}
            variant="contained"
            type="submit"
            loading={isLoading}
            color="success"
          >
            <span>{SAVE}</span>
          </LoadingButton>
        </div>
      </form>

      <AnnounceGrid triggerRefetch={refetch} />
    </section>
  );
  return content;
};
