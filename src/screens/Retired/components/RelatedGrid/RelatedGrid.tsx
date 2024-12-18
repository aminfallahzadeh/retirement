// IMPORTS
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetRelatedListByParentPersonIDQuery,
  useRemoveRelatedMutation,
} from "@/features/related/relatedApi";
import useToggleState from "@/hooks/useToggleState";
import { Grid } from "@/shared/components/Grid";
import { DeleteModal } from "@/shared/components/DeleteModal";
import { relatedColumns } from "./columns";
import { relatedGridTopActionsProvider } from "./actions";
import { Related } from "../../types";
import { toastConfig } from "@/config/toast";

export const RelatedGrid = () => {
  // STATES
  const [tableData, setTableData] = useState<Related[]>([]);
  const [deleteModal, toggleDeleteModal] = useToggleState(false);
  const [id, setId] = useState<string | null>("");
  const [searchParams] = useSearchParams();

  // CONSTS
  const parentPersonID = searchParams.get("personID");
  const {
    data: related,
    isSuccess,
    isLoading,
    isFetching,
    refetch,
  } = useGetRelatedListByParentPersonIDQuery(parentPersonID);
  const [deleteRelated, { isLoading: isDeleting }] = useRemoveRelatedMutation();

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      console.log(related);
      const mappedData = related.itemList.map(
        (item: Related, index: number) => ({
          id: item.personID,
          relatedRowNo: index + 1,
          pensionaryID: item.pensionaryID,
          personBirthDate: item.personBirthDate,
          personNationalCode: item.personNationalCode,
          personFirstName: item.personFirstName,
          personLastName: item.personLastName,
          pensionaryIsUnderGauranteeText: item.pensionaryIsUnderGauranteeText,
          relationshipWithParentName: item.relationshipWithParentName,
        })
      );

      setTableData(mappedData);
    }
  }, [isSuccess, related]);

  const handleDeleteRelated = async () => {
    const response = await deleteRelated({
      pensionaryID: id,
    }).unwrap();
    toggleDeleteModal();
    refetch();
    toastConfig.success(response.message);
  };

  const handleRemoveRelatedClick = (id: string) => {
    setId(id);
    toggleDeleteModal();
  };

  const columns = relatedColumns(parentPersonID, handleRemoveRelatedClick);

  const topBarActions = relatedGridTopActionsProvider(
    isLoading,
    isFetching,
    refetch,
    parentPersonID
  );

  // MAIN
  const content = (
    <>
      <DeleteModal
        open={deleteModal}
        onClose={toggleDeleteModal}
        isLoading={isDeleting}
        handleRemove={handleDeleteRelated}
      />
      <Grid
        data={tableData}
        columns={columns}
        scroll={false}
        topBarActions={topBarActions}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </>
  );

  return content;
};
