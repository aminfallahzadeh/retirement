// IMPORTS
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useGetGroupQuery,
  useDeleteGroupMutation,
} from "@/features/user/userApi";
import {
  IconButton,
  Box,
  Button,
  Tooltip,
  CircularProgress,
  PaginationItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
  ChecklistRtlOutlined as ChecklistRtlIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Done as DoneIcon,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { findById, convertToPersianNumber } from "@/helper";
import { defaultTableOptions } from "@/config/mrt";
import Modal from "@/components/Modal";
import UpdateGroupForm from "@/forms/UpdateGroupForm";
import ItemsGrid from "@/grids/ItemsGrid";
import GroupItemsGrid from "@/grids/GroupItemsGrid";
import ArrowButtonsGroups from "@/components/ArrowButtonsGroups";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

function GroupsGrid() {
  const [tableData, setTableData] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [rowSelection, setRowSelection] = useState({});

  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showEditItemsModal, setShowEditItemsModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);

  const [deleteGroup, { isLoading: isDeleting }] = useDeleteGroupMutation();

  const dispatch = useDispatch();

  const {
    data: groups,
    isLoading,
    isFetching,
    isSuccess,
    error,
    refetch,
  } = useGetGroupQuery();

  const handleShowEditNameModal = () => {
    setShowEditNameModal(true);
  };

  const handlShowDeleteGroupModal = () => {
    setShowDeleteGroupModal(true);
  };

  const handleShowEditItemsModal = () => {
    setShowEditItemsModal(true);
  };

  const handleRefresh = () => {
    refetch();
  };

  const deleteGroupHandler = async () => {
    try {
      const res = await deleteGroup({
        id: selectedGroup?.id,
        groupName: selectedGroup?.groupName,
        isdeleted: true,
      }).unwrap();
      setShowDeleteGroupModal(false);
      refetch();
      toast.success(res.message, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = groups.itemList.map((group) => ({
        id: group.id,
        groupName: group.groupName,
      }));

      setTableData(data);
    }
  }, [
    groups,
    isSuccess,
    dispatch,
    refetch,
    showDeleteGroupModal,
    showEditNameModal,
    showEditItemsModal,
  ]);

  // handle errors
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "groupName",
        header: "نام گروه",
        size: 20,
      },
      {
        accessorKey: "editGroupNameAction",
        header: "ویرایش گروه",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title={row.original.groupName}>
            <IconButton
              color="success"
              onClick={handleShowEditNameModal}
              sx={{ padding: "0" }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        accessorKey: "editItemsAction",
        header: "ویرایش دسترسی ها",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title={row.original.groupName}>
            <IconButton
              color="primary"
              onClick={handleShowEditItemsModal}
              sx={{ padding: "0" }}
            >
              <ChecklistRtlIcon />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        accessorKey: "deleteGroupAction",
        header: "حذف گروه",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title={row.original.groupName}>
            <IconButton
              color="error"
              onClick={handlShowDeleteGroupModal}
              sx={{ padding: "0" }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    ...defaultTableOptions,
    columns,
    data: tableData,
    muiPaginationProps: {
      size: "small",
      shape: "rounded",
      showRowsPerPage: false,
      renderItem: (item) => (
        <PaginationItem
          {...item}
          page={convertToPersianNumber(item.page)}
          slots={{
            previous: ChevronRight,
            next: ChevronLeft,
            first: LastPage,
            last: FirstPage,
          }}
        />
      ),
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
    renderTopToolbarCustomActions: () => (
      <Box>
        {isFetching ? (
          <IconButton aria-label="refresh" color="info" disabled>
            <CircularProgress size={20} value={100} />
          </IconButton>
        ) : (
          <Tooltip title="بروز رسانی">
            <span>
              <IconButton
                aria-label="refresh"
                color="info"
                onClick={handleRefresh}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        )}
        <Link to={"/retirement/create-group"}>
          {isFetching ? (
            <IconButton aria-label="refresh" color="info" disabled>
              <CircularProgress size={20} value={100} color={"success"} />
            </IconButton>
          ) : (
            <Tooltip title="ایجاد گروه">
              <span>
                <IconButton
                  aria-label="refresh"
                  color="success"
                  onClick={handleRefresh}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          )}
        </Link>
      </Box>
    ),
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];

    const group = findById(tableData, id);

    if (group) {
      setSelectedGroup(group);
    }
  }, [table, tableData, rowSelection]);

  const content = (
    <>
      {isLoading ? (
        <div className="skeleton-lg">
          <Skeleton
            count={5}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
          />
        </div>
      ) : (
        <>
          {showEditNameModal ? (
            <Modal
              title={"ویرایش نام گروه"}
              closeModal={() => setShowEditNameModal(false)}
            >
              <UpdateGroupForm
                setShowEditModal={setShowEditNameModal}
                selectedGroup={selectedGroup}
              />
            </Modal>
          ) : showDeleteGroupModal ? (
            <Modal
              title={"حذف گروه"}
              closeModal={() => setShowDeleteGroupModal(false)}
            >
              <p className="paragraph-primary">
                آیا از حذف این گروه اطمینان دارید؟
              </p>
              <div className="flex-row flex-center">
                <LoadingButton
                  dir="ltr"
                  endIcon={<DoneIcon />}
                  loading={isDeleting}
                  onClick={deleteGroupHandler}
                  variant="contained"
                  color="success"
                >
                  <span>بله</span>
                </LoadingButton>
                <Button
                  dir="ltr"
                  endIcon={<CloseIcon />}
                  onClick={() => setShowDeleteGroupModal(false)}
                  variant="contained"
                  color="error"
                >
                  <span>خیر</span>
                </Button>
              </div>
            </Modal>
          ) : showEditItemsModal ? (
            <Modal
              title={"ویرایش دسترسی ها"}
              closeModal={() => setShowEditItemsModal(false)}
            >
              <div className="formContainer flex-row">
                <div className="flex-col">
                  <div className="modal__header">
                    <h4 className="title-tertiary">دسترسی ها</h4>
                  </div>
                  <ItemsGrid />
                </div>
                <div className="flex-col">
                  <div className="modal__header">
                    <h4 className="title-tertiary">عملیات</h4>
                  </div>
                  <div style={{ marginTop: "6rem" }}>
                    <ArrowButtonsGroups
                      selectedGroup={selectedGroup}
                      setShowEditItemsModal={setShowEditItemsModal}
                    />
                  </div>
                </div>

                <div className="flex-col">
                  <div className="modal__header">
                    <h4 className="title-tertiary">دسترسی های گروه</h4>
                  </div>
                  <GroupItemsGrid selectedGroup={selectedGroup} />
                </div>
              </div>
            </Modal>
          ) : null}

          <MaterialReactTable table={table} />
        </>
      )}
    </>
  );

  return content;
}

export default GroupsGrid;
