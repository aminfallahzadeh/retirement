// IMPORTS
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetRequestAttachmentQuery,
  useDeleteRequestAttachmentMutation,
} from "@/features/request/requestApi";
import useToggleState from "@/hooks/useToggleState";
import { RequestAttachment } from "../../types";
import { Grid } from "@/shared/components/Grid";
import { CustomModal } from "@/shared/components/CustomModal";
import { DeleteModal } from "@/shared/components/DeleteModal";
import { attachmentsColumns } from "./columns";
import { attachmentsActions } from "./actions";
import { toastConfig } from "@/config/toast";
import InsertAttachmentForm from "../../forms/InsertAttachmentForm";
import { INSERT_ATTACHMENT } from "@/constants/const";

const AttachmentsGrid = () => {
  // STATES
  const [searchParams] = useSearchParams();
  const [deleteModal, toggleDeleteModal] = useToggleState(false);
  const [insertModal, toggleInsertModal] = useToggleState(false);
  const [tableData, setTableData] = useState<RequestAttachment[]>([]);
  const [id, setID] = useState<string>("");

  // CONSTS
  const requestID = searchParams.get("requestID");
  const { data, isLoading, isSuccess, isFetching, refetch } =
    useGetRequestAttachmentQuery(requestID);
  const [deleteAttachment, { isLoading: isDeletingAttachment }] =
    useDeleteRequestAttachmentMutation();

  // HANDLERS
  const handleDeleteAttachmentClick = (id: string) => {
    setID(id);
    toggleDeleteModal();
  };

  const handleDeleteAttachment = async () => {
    const response = await deleteAttachment(id).unwrap();
    refetch();
    toggleDeleteModal();
    toastConfig.success(response.message);
  };

  useEffect(() => {
    if (isSuccess) {
      const mappedData = data?.itemList.map(
        (item: RequestAttachment, index: number) => {
          const image = item.attachment;
          const contentType = item.contentType;
          const prefix = `data:${contentType};base64,`;
          const previewImage = `${prefix}${image}`;

          return {
            id: item.requestAttachmentID,
            image: previewImage,
            attachmentsRowNo: index + 1,
            attachmentTypeName: item.attachementTypeName || "-",
            attachmentsDesc: item.attachementDesc || "-",
          };
        }
      );
      setTableData(mappedData);
    }
  }, [isSuccess, data]);

  // CONTENT
  const columns = attachmentsColumns(handleDeleteAttachmentClick);
  const topBarActions = attachmentsActions(
    isLoading,
    isFetching,
    toggleInsertModal
  );

  const content = (
    <>
      <CustomModal
        title={INSERT_ATTACHMENT}
        open={insertModal}
        onClose={toggleInsertModal}
      >
        <InsertAttachmentForm
          refetch={refetch}
          closeModal={toggleInsertModal}
        />
      </CustomModal>

      <DeleteModal
        open={deleteModal}
        isLoading={isDeletingAttachment}
        onClose={toggleDeleteModal}
        handleRemove={handleDeleteAttachment}
      />
      <Grid
        data={tableData}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        topBarActions={topBarActions}
        scroll={false}
      />
    </>
  );
  return content;
};

export default AttachmentsGrid;
