// IMPORTS
import { useCallback, useEffect, useState } from "react";
import { Announce } from "./types";
import {
  useGetAnnounceQuery,
  useDeleteAnnounceMutation,
} from "@/features/announce/announceApi";
import { announceColumns } from "./columns";
import { Grid } from "@/shared/components/Grid";
import { DeleteModal } from "@/shared/components/DeleteModal";
import useToggleState from "@/hooks/useToggleState";
import { toastConfig } from "@/config/toast";

export const AnnounceGrid = ({
  triggerRefetch,
}: {
  triggerRefetch: boolean;
}) => {
  // STATES
  const [open, toggleOpen] = useToggleState(false);
  const [id, setId] = useState<string | null>(null);
  const [tableData, setTableData] = useState<Announce[]>([]);

  // CONSTS
  const { data, isLoading, isFetching, isSuccess, refetch } =
    useGetAnnounceQuery({});
  const [deleteAnnounce, { isLoading: isDeleting }] =
    useDeleteAnnounceMutation();

  const handleRemoveAnnounceClick = (id: string) => {
    setId(id);
    toggleOpen();
  };

  const handleRemoveAnnounce = useCallback(async () => {
    const response = await deleteAnnounce({
      announceID: id,
      isDeleted: true,
    }).unwrap();
    toggleOpen();
    refetch();
    toastConfig.success(response.message);
  }, [deleteAnnounce, id, refetch, toggleOpen]);

  const columns = announceColumns(handleRemoveAnnounceClick);

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      const mappedData = data.itemList.map((item: Announce, index: number) => ({
        id: item.announceID,
        announceRowNo: index + 1,
        announceTitle: item.title,
        announceDesc: item.description,
        announceRunDate: item.runDate,
      }));

      setTableData(mappedData);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    refetch();
  }, [triggerRefetch, refetch]);

  // CONTENT
  const content = (
    <>
      <DeleteModal
        open={open}
        onClose={toggleOpen}
        isLoading={isDeleting}
        handleRemove={handleRemoveAnnounce}
      />

      <Grid
        data={tableData}
        columns={columns}
        scroll={false}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </>
  );

  return content;
};
