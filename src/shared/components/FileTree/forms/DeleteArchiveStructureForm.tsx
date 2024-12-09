// IMPORTS
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import {
  Close as CloseIcon,
  Done as DoneIcon,
  WarningAmberOutlined as WarningIcon,
} from "@mui/icons-material";
import { YES, NO } from "@/constants/const";
import { ArchiveStructureFormProps } from "./types";
import { useDeleteArchiveStructureMutation } from "@/features/archive/archiveApi";
import { toastConfig } from "@/config/toast";

const DeleteArchiveStructureForm = ({
  setCloseModal,
  item,
  refetch,
}: ArchiveStructureFormProps) => {
  // CONSTS
  const [deleteArhiveStructure, { isLoading }] =
    useDeleteArchiveStructureMutation();

  // HANLDERS
  const onSubmit = async () => {
    const response = await deleteArhiveStructure({
      id: item?.id,
    }).unwrap();
    setCloseModal();
    refetch();
    toastConfig.success(response.message);
  };

  const content = (
    <section className="flex flex-col">
      <div className="flex gap-x-2">
        <WarningIcon color="warning" />
        <p className="paragraph">
          آیا از حذف پوشه{" "}
          <strong className="accent">&quot;{item?.label}&quot;</strong> اطمینان
          دارید؟
        </p>
      </div>

      <div className="flex justify-center items-center gap-x-5">
        <LoadingButton
          dir="ltr"
          endIcon={<DoneIcon />}
          loading={isLoading}
          onClick={onSubmit}
          variant="contained"
          color="success"
        >
          <span>{YES}</span>
        </LoadingButton>
        <Button
          dir="ltr"
          endIcon={<CloseIcon />}
          onClick={setCloseModal}
          variant="contained"
          color="error"
        >
          <span>{NO}</span>
        </Button>
      </div>
    </section>
  );

  return content;
};

export default DeleteArchiveStructureForm;
