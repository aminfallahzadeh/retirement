// react imports
import { useEffect, useState } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useInsertGroupItemMutation } from "@/features/user/userApi";

// library imports
import { toast } from "react-toastify";

// mui imports
import {
  KeyboardDoubleArrowLeft as DoubleArrowLeftIcon,
  KeyboardDoubleArrowRight as DoubleArrowRightIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import {
  removeItemsFromTable,
  addItemsToTable,
} from "../slices/itemsDataSlice";
import { addGroupItems, removeGroupItems } from "../slices/groupItemsDataSlice";

function ArrowButtonsGroups({ selectedGroup, setShowEditItemsModal }) {
  const [groupID, setGroupID] = useState(null);
  const dispatch = useDispatch();

  const { selectedItemData } = useSelector((state) => state.itemsData);
  const { selectedGroupItemData } = useSelector(
    (state) => state.groupItemsData
  );

  useEffect(() => {
    if (selectedGroup) {
      setGroupID(selectedGroup.id);
    }
  }, [selectedGroup]);

  // const { selectedGroupData } = useSelector((state) => state.groupsData);
  const { groupItemsTableData } = useSelector((state) => state.groupItemsData);

  const [insertGroupItem, { isLoading: isInserting }] =
    useInsertGroupItemMutation();

  const saveChangesHandler = async () => {
    try {
      // const groupID = selectedGroup?.id;
      const data = groupItemsTableData.map((item) => ({
        id: "",
        itemID: item.id,
        itemName: "",
        groupID,
      }));
      const insertRes = await insertGroupItem(data).unwrap();
      console.log(insertRes);
      toast.success(insertRes.message, {
        autoClose: 2000,
      });
      setShowEditItemsModal(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  const handleAddGroupItem = (id) => {
    dispatch(addGroupItems(selectedItemData));
    dispatch(removeItemsFromTable(id));
  };

  const handleRemoveGroupItem = (id) => {
    dispatch(addItemsToTable(selectedGroupItemData));
    dispatch(removeGroupItems(id));
  };

  const content = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        rowGap: "10px",
      }}
    >
      <Button
        onClick={() => handleAddGroupItem(selectedItemData.id)}
        variant="contained"
        color="primary"
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() => handleRemoveGroupItem(selectedGroupItemData.id)}
        variant="contained"
        color="primary"
      >
        <DoubleArrowRightIcon />
      </Button>

      <LoadingButton
        dir="ltr"
        endIcon={<SaveIcon />}
        loading={isInserting}
        onClick={saveChangesHandler}
        variant="contained"
        color="success"
      >
        <span>ذخیره</span>
      </LoadingButton>
    </div>
  );

  return content;
}

export default ArrowButtonsGroups;
