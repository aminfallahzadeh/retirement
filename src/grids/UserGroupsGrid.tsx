// react imports
import { useMemo, useState, useEffect } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { useGetUserGroupsQuery } from "@/features/user/userApi";
import {
  setUserGroupsTableData,
  setSelectedUserGroupData,
} from "../slices/userGroupsDataSlice.js";

// mui imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// helpers
import { findById } from "@/helper";

// utils imports
import { defaultTableOptions } from "@/config/mrt";

function UserGroupsGrid({ userID, userName }) {
  const [rowSelection, setRowSelection] = useState({});
  const dispatch = useDispatch();

  // access the data from redux store
  const { userGroupsTableData } = useSelector((state) => state.userGroupsData);

  // fetch data from the API
  const {
    data: userGroups,
    isSuccess,
    isLoading,
    error,
    refetch,
  } = useGetUserGroupsQuery(userID);

  // trigger the fetch
  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = userGroups.itemList.map((item) => ({
        id: item.groupID,
        name: item.groupName,
      }));
      dispatch(setUserGroupsTableData(data));
    } else if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  }, [userGroups, isSuccess, dispatch, refetch, error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: `ویرایش گروه های ${userName}`,
        size: 300,
      },
    ],
    [userName]
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: userGroupsTableData,
    enablePagination: false,
    enableBottomToolbar: false,
    muiTableContainerProps: { sx: { height: "300px" } },
    positionGlobalFilter: "left",
    initialState: {
      density: "compact",
      showGlobalFilter: true,
    },
    muiTableBodyRowProps: ({ row }) => ({
      //implement row selection click events manually
      onClick: () =>
        setRowSelection(() => ({
          [row.id]: true,
        })),
      selected: rowSelection[row.id],
      sx: {
        cursor: "pointer",
      },
    }),
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];
    const selectedGroup = findById(userGroupsTableData, id);

    if (id && selectedGroup) {
      dispatch(setSelectedUserGroupData(selectedGroup));
    } else {
      dispatch(setSelectedUserGroupData(null));
    }
  }, [dispatch, table, rowSelection, userGroupsTableData]);

  const content = (
    <>
      {isLoading ? (
        <div className="skeleton-md">
          <Skeleton
            count={7}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
            width={280}
          />
        </div>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </>
  );

  return content;
}

export default UserGroupsGrid;
