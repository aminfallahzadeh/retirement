// IMPORTS
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetHeirListByParentPersonIDQuery,
  useRemoveHeirMutation,
} from "@/features/heir/heirApi";
import { Heir } from "../../types";
import { Grid } from "@/shared/components/Grid";
import { DeleteModal } from "@/shared/components/DeleteModal";
import useToggleState from "@/hooks/useToggleState";
import { heirColumns } from "./columns";
import { heirGridTopActionsProvider } from "./actions";
import { toastConfig } from "@/config/toast";

export const HeirGrid = () => {
  // STATES
  const [id, setId] = useState<string | null>("");
  const [tableData, setTableData] = useState<Heir[]>([]);
  const [deleteModal, toggleDeleteModal] = useToggleState(false);
  const [searchParams] = useSearchParams();

  // CONSTS
  const parentPersonID = searchParams.get("personID");
  const { data, isLoading, isSuccess, isFetching, refetch } =
    useGetHeirListByParentPersonIDQuery(parentPersonID);
  const [removeHeir, { isLoading: isDeleting }] = useRemoveHeirMutation();

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      const mappedData = data.itemList.map((item: Heir, index: number) => ({
        id: item.personID,
        heirRowNo: index + 1,
        pensionaryID: item.pensionaryID,
        heirNationalCode: item.personNationalCode,
        heirFirstName: item.personFirstName,
        heirLastName: item.personLastName,
        heirPensionaryIsUnderGauranteeText: item.pensionaryIsUnderGauranteeText,
        heirBirthDate: item.personBirthDate,
        heirRelationshipWithParentName: item.relationshipWithParentName,
        heirParentPersonNationalCode: item.parentPersonNationalCode,
      }));

      setTableData(mappedData);
    }
  }, [isSuccess, data]);

  const handleDeleteHeir = async () => {
    const response = await removeHeir({
      pensionaryID: id,
    }).unwrap();
    refetch();
    toggleDeleteModal();
    toastConfig.success(response.message);
  };

  const handleRemoveHeirClick = (id: string) => {
    setId(id);
    toggleDeleteModal();
  };

  const columns = heirColumns(parentPersonID, handleRemoveHeirClick);

  const topBarActions = heirGridTopActionsProvider(
    isLoading,
    isFetching,
    refetch,
    parentPersonID
  );

  // CONTENT
  const content = (
    <>
      <DeleteModal
        open={deleteModal}
        onClose={toggleDeleteModal}
        isLoading={isDeleting}
        handleRemove={handleDeleteHeir}
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
