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
import { Statement } from "@/shared/types/statement";
import { toastConfig } from "@/config/toast";
import { MRT_ColumnDef } from "material-react-table";

export const RetiredStatementsGrid = ({
  columns,
}: {
  columns?: MRT_ColumnDef<Statement>[];
}) => {
  // STATES
  const [tableData, setTableData] = useState<Statement[]>([]);
  const [deleteModal, toggleDeleteModal] = useToggleState(false);
  const [id, setId] = useState<string | null>("");
  const [searchParams] = useSearchParams();

  // CONSTS
  const personID = searchParams.get("personID");
  const requestID = searchParams.get("requestID");
  const { data, isSuccess, isLoading, isFetching, refetch } =
    useGetListOfRetirementStatementsQuery({ personID });
  const [removeStatement, { isLoading: isDeleting }] =
    useRemoveRetirementStatementMutation();

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
        personID: item.personID,
        personDeathDate: item.personDeathDate,
      }));

      setTableData(mappedData);
    }
  }, [isSuccess, data]);

  const handleRemoveRelatedClick = (id: string) => {
    setId(id);
    toggleDeleteModal();
  };

  const handleRemoveStatement = async () => {
    const response = await removeStatement({
      rsID: id,
    }).unwrap();
    toastConfig.success(response.message);
    refetch();
    toggleDeleteModal();
  };

  const defaultColumns = statementsColumns(handleRemoveRelatedClick);

  const topBarActions = statementsTopActionsProvider(
    isLoading,
    isFetching,
    personID,
    requestID
  );

  // CONTENT

  const content = (
    <>
      <DeleteModal
        open={deleteModal}
        onClose={toggleDeleteModal}
        isLoading={isDeleting}
        handleRemove={handleRemoveStatement}
      />
      <Grid
        data={tableData}
        columns={columns ? columns : defaultColumns}
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

export default RetiredStatementsGrid;
