// IMPORTS
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetListOfRetirementStatementsQuery,
  useRemoveRetirementStatementMutation,
} from "@/features/statement/statementApi";
import useToggleState from "@/hooks/useToggleState";
import { Grid } from "@/shared/components/Grid";
import { DeleteModal } from "@/shared/components/DeleteModal";
import { statementsColumns } from "./columns";
import { statementsTopActionsProvider } from "./actions";
import { Statement } from "../../types";
import { toastConfig } from "@/config/toast";

export const StatementsGrid = () => {
  // STATES
  const [tableData, setTableData] = useState<Statement[]>([]);
  const [deleteModal, toggleDeleteModal] = useToggleState(false);
  //   const [id, setId] = useState<string | null>("");
  const [searchParams] = useSearchParams();

  // CONSTS
  const personID = searchParams.get("personID");
  const { data, isSuccess, isLoading, isFetching } =
    useGetListOfRetirementStatementsQuery({ personID });

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      const mappedData = data.map((item: Statement, index: number) => ({
        id: item.retirementStatementID,
        retirementStatementRowNo: index + 1,
        retirementStatementSerial: item.retirementStatementSerial,
        retirementStatementTypeName: item.retirementStatementTypeName,
        retirementStatementNo: item.retirementStatementNo || "-",
        retirementStatementIssueDate: item.retirementStatementIssueDate,
        retirementStatementRunDate: item.retirementStatementRunDate,
        retirementStatementIssueConfirmDate:
          item.retirementStatementIssueConfirmDate,
      }));

      setTableData(mappedData);
    }
  }, [isSuccess, data]);

  const handleRemoveRelatedClick = (id: string) => {
    // setId(id);
    toggleDeleteModal();
  };

  const columns = statementsColumns(handleRemoveRelatedClick);

  const topBarActions = statementsTopActionsProvider(isLoading, isFetching);

  // CONTENT

  const content = (
    <>
      <DeleteModal
        open={deleteModal}
        onClose={toggleDeleteModal}
        // isLoading={isDeleting}
        // handleRemove={handleDeleteRelated}
      />
      <Grid
        data={tableData}
        columns={columns}
        scroll={true}
        topBarActions={topBarActions}
        isLoading={isLoading}
        isFetching={isFetching}
        sorting={[{ id: "retirementStatementIssueDate", desc: true }]}
      />
    </>
  );

  return content;
};
