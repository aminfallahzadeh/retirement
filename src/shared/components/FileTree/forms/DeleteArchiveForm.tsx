// IMPORTS
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Save as SaveIcon,
  InfoOutlined as WarningIcon,
} from "@mui/icons-material";
import { SAVE } from "@/constants/const";
import { DESCRIPTION } from "@/constants/fields";
import { ArchiveFormProps } from "./types";
import { useDeleteArchiveMutation } from "@/features/archive/archiveApi";
import { toastConfig } from "@/config/toast";
import { useSearchParams } from "react-router-dom";

const DeleteArchiveForm = ({
  setCloseModal,
  item,
  refetch,
}: ArchiveFormProps) => {
  // STATES
  const [searchParams] = useSearchParams();
  const [deleteDesc, setDeleteDesc] = useState<string>("");

  // CONSTS
  const personID = searchParams.get("personID");
  const [deleteArchive, { isLoading }] = useDeleteArchiveMutation();

  // HANDLERS
  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteDesc(e.target.value);
  };

  const onSubmit = async () => {
    const response = await deleteArchive({
      id: item?.id,
      personID,
      deleteDesc,
    }).unwrap();
    setCloseModal();
    refetch();
    toastConfig.success(response.message);
  };

  const content = (
    <section className="flex flex-col">
      <form method="POST" className="grid grid-cols-1 gap-0">
        <div className="flex gap-x-2 w-full justify-center items-center">
          <WarningIcon color="warning" />
          <p className="paragraph">
            حذف برگه
            <span className="accent">&quot;{item?.label}&quot;</span>
          </p>
        </div>

        <div className="inputBox__form">
          <input
            type="text"
            id="documentID"
            className="inputBox__form--input"
            value={deleteDesc}
            onChange={handleDescChange}
            required
          />
          <label className="inputBox__form--label" htmlFor="documentID">
            <span>*</span> {DESCRIPTION}
          </label>
        </div>
      </form>

      <div className="mr-auto">
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          loading={isLoading}
          onClick={onSubmit}
          variant="contained"
          color="success"
          disabled={!deleteDesc || deleteDesc === ""}
          sx={{ fontFamily: "IranYekan" }}
        >
          <span>{SAVE}</span>
        </LoadingButton>
      </div>
    </section>
  );

  return content;
};

export default DeleteArchiveForm;
