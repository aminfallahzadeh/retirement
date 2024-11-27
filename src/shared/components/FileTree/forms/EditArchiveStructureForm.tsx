// IMPORTS
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";
import { SAVE, FOLDER_NAME } from "@/constants/const";
import { ArchiveStructureFormProps } from "./types";
import { useUpdateArchiveStructureMutation } from "@/features/archive/archiveApi";
import { toastConfig } from "@/config/toast";

const EditArchiveStructureForm = ({
  setCloseModal,
  item,
  refetch,
}: ArchiveStructureFormProps) => {
  // STATES
  const [name, setName] = useState<string | undefined>(item?.label);

  // CONSTS
  const [updateArchiveStructure, { isLoading }] =
    useUpdateArchiveStructureMutation();

  // HANDLERS
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = async () => {
    const response = await updateArchiveStructure({
      id: item?.id,
      name,
    }).unwrap();
    setCloseModal();
    refetch();
    toastConfig.success(response.message);
  };

  const content = (
    <section className="flex flex-col items-center justify-center w-full">
      <form method="POST" className="inputBox__form w-full">
        <input
          type="text"
          className="inputBox__form--input inputBox__form--input-height-40"
          required
          id="archiveName"
          value={name}
          onChange={handleNameChange}
        />
        <label htmlFor="archiveName" className="inputBox__form--label">
          {FOLDER_NAME}
        </label>
      </form>

      <div className="mr-auto">
        <LoadingButton
          dir="ltr"
          endIcon={<SaveIcon />}
          loading={isLoading}
          onClick={onSubmit}
          variant="contained"
          color="success"
          disabled={name === item?.label || !name || name === ""}
          sx={{ fontFamily: "IranYekan" }}
        >
          <span>{SAVE}</span>
        </LoadingButton>
      </div>
    </section>
  );

  return content;
};

export default EditArchiveStructureForm;
