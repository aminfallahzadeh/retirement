// IMPORTS
import { useState } from "react";
import { GlobalSearch } from "@/shared/components/GlobalSearch";
import { personnelPayActions } from "./actions";
import {
  useLazyGetFinancialItemsQuery,
  useRemoveFinancialItemMutation,
} from "@/features/financial/financialApi";
import { CustomModal } from "@/shared/components/CustomModal";
import { payItemsColumns } from "./sub/PayItemsGrid/columns";
import { topBarActionsProvider } from "./sub/PayItemsGrid/actions";
import { OBSERVE, ADD_ITEM } from "@/constants/const";
import ViewPayItemForm from "@/forms/ViewPayItemForm";
import CreatePayItemForm from "@/forms/CreatePayItemForm";
import { PayItem } from "./types";
import { DeleteModal } from "@/shared/components/DeleteModal";
import { toastConfig } from "@/config/toast";
import { PayItemsGrid } from "./sub/PayItemsGrid";

export const FractionAndPayment = () => {
  //STATES
  const [tableData, setTableData] = useState<PayItem[]>([]);
  const [observeModalOpen, setObserveModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [insertModalOpen, setInsertModalOpen] = useState<boolean>(false);
  const [payItemID, setPayItemID] = useState<string>("");
  const [personID, setPersonID] = useState<string>("");
  const [canAdd, setCanAdd] = useState<boolean>(false);

  // CONSTS
  const [getItems, { isLoading, isFetching }] = useLazyGetFinancialItemsQuery();
  const [removeItem, { isLoading: isItemRemoving }] =
    useRemoveFinancialItemMutation();

  // HANDLERS
  const handleObserveModalOpenChange = (id: string) => {
    setObserveModalOpen(true);
    setPayItemID(id);
  };

  const handelDeleteModalOpenChange = (id: string) => {
    setDeleteModalOpen(true);
    setPayItemID(id);
  };

  const handleInsertModalOpenChange = () => {
    setInsertModalOpen(true);
  };

  const fetchItems = async (personID: string) => {
    const response = await getItems(personID).unwrap();
    const mappedData = response.itemList.map(
      (item: PayItem, index: number) => ({
        id: item.financialItemID,
        personID: item.personID,
        financialItemRowNum: index + 1,
        payItemTypeID: item.payItemTypeID || "-",
        payItemTypeName: item.payItemTypeName || "-",
        payItemAmount: item.financialItemAmount || "-",
      })
    );
    setPersonID(personID);
    setTableData(mappedData);
    setCanAdd(false);
  };

  const handleRemoveItem = async () => {
    const response = await removeItem(payItemID).unwrap();
    fetchItems(personID);
    setDeleteModalOpen(false);
    toastConfig.success(response.message);
  };

  const columns = payItemsColumns(
    handleObserveModalOpenChange,
    handelDeleteModalOpenChange
  );

  const actions = topBarActionsProvider({
    fn: handleInsertModalOpenChange,
    disabled: canAdd,
  });

  return (
    <>
      <CustomModal
        title={OBSERVE}
        open={observeModalOpen}
        onClose={() => setObserveModalOpen(false)}
      >
        <ViewPayItemForm id={payItemID} />
      </CustomModal>

      <DeleteModal
        open={deleteModalOpen}
        isLoading={isItemRemoving}
        onClose={() => setDeleteModalOpen(false)}
        handleRemove={handleRemoveItem}
      />

      <CustomModal
        title={ADD_ITEM}
        open={insertModalOpen}
        onClose={() => setInsertModalOpen(false)}
      >
        <CreatePayItemForm setIsInsertItemModalOpen={setInsertModalOpen} />
      </CustomModal>

      <GlobalSearch actions={personnelPayActions(fetchItems)} />

      <div className="flex-col flex-center u-margin-top-md">
        <h4 className="title-secondary">جدول آیتم ها</h4>
      </div>

      <PayItemsGrid
        columns={columns}
        data={tableData}
        isFetching={isFetching}
        topBarActions={actions}
        isLoading={isLoading}
      />
    </>
  );
};
