// IMPORTS
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "@/features/user/userApi";
import {
  IconButton,
  Box,
  Tooltip,
  CircularProgress,
  PaginationItem,
} from "@mui/material";
import {
  EditOutlined as EditIcon,
  ChecklistRtlOutlined as ChecklistRtlIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { defaultTableOptions } from "@/config/mrt";
import { convertToPersianNumber, findById } from "@/helper";
import Modal from "@/components/Modal";
import UpdateUserForm from "@/forms/UpdateUserForm";
import GroupsGridUser from "@/grids/GroupsGridUser";
import UserGroupsGrid from "@/grids/UserGroupsGrid";
import ArrowButtonsUsers from "@/components/ArrowButtonsUsers";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function UsersGrid() {
  const [usersTableData, setUsersTableData] = useState([]);

  const [userName, setUserName] = useState(null);

  const [rowSelection, setRowSelection] = useState({});
  const [userID, setUserID] = useState(null);

  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showEditUserGroupsModal, setShowEditUserGroupsModal] = useState(false);

  const {
    data: users,
    isLoading,
    isFetching,
    isSuccess,
    error,
    refetch,
  } = useGetUserQuery({});

  const handleShowEditNameModal = () => {
    setShowEditUserModal(true);
  };

  const handleShowEditUserGroupsModal = () => {
    setShowEditUserGroupsModal(true);
  };

  const handleRefresh = () => {
    refetch();
  };

  useEffect(() => {
    refetch();
    if (isSuccess) {
      const data = users.itemList.map((user) => ({
        id: user.userID,
        isActive: user.isActive ? "فعال" : "غیر فعال",
        lastName: user.lastName,
        firstName: user.firstName,
        username: user.username,
        password: user.password,
        email: user.email,
        sex: user.sex,
        tel: user.tel,
        mobile: user.mobile,
      }));
      setUsersTableData(data);
    }
  }, [users, isSuccess, refetch, showEditUserModal, showEditUserGroupsModal]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
        style: {
          fontSize: "18px",
        },
      });
    }
  }, [error]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "username",
        header: "نام کاربری",
        size: 20,
      },
      {
        accessorKey: "firstName",
        header: "نام",
        size: 20,
      },
      {
        accessorKey: "lastName",
        header: "نام خانوادگی",
        size: 20,
      },
      {
        accessorKey: "isActive",
        header: "وضعیت",
        size: 20,
      },
      {
        accessorKey: "editUserAction",
        header: "ویرایش کاربر",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => {
          return (
            <Tooltip
              title={`${row.original.firstName} ${row.original.lastName}`}
            >
              <IconButton
                color="success"
                onClick={handleShowEditNameModal}
                sx={{ padding: "0" }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: "editGroupsAction",
        header: "ویرایش گروه ها",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip title={`${row.original.firstName} ${row.original.lastName}`}>
            <IconButton
              color="info"
              onClick={handleShowEditUserGroupsModal}
              sx={{ padding: "0" }}
            >
              <ChecklistRtlIcon />
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
    data: usersTableData,
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
        <Link to={"/retirement/create-user"}>
          {isFetching ? (
            <IconButton aria-label="refresh" color="info" disabled>
              <CircularProgress size={20} value={100} color={"success"} />
            </IconButton>
          ) : (
            <Tooltip title="ایجاد کاربر">
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

    if (id) {
      const userName = findById(usersTableData, id).username;

      setUserID(id);
      setUserName(userName);
    }
  }, [table, rowSelection, usersTableData]);

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
          {showEditUserModal ? (
            <Modal
              title={"ویرایش اطلاعات کاربر"}
              closeModal={() => setShowEditUserModal(false)}
            >
              <UpdateUserForm
                setShowEditUserModal={setShowEditUserModal}
                userID={userID}
              />
            </Modal>
          ) : showEditUserGroupsModal ? (
            <Modal
              title={"ویرایش گروه های کاربر"}
              closeModal={() => setShowEditUserGroupsModal(false)}
            >
              <div className="flex-row">
                <div className="flex-col">
                  <div className="modal__header">
                    <h4 className="title-tertiary">گروه ها</h4>
                  </div>

                  <GroupsGridUser />
                </div>

                <div className="flex-col">
                  <div className="modal__header">
                    <h4 className="title-tertiary">عملیات</h4>
                  </div>

                  <div style={{ marginTop: "6rem" }}>
                    <ArrowButtonsUsers
                      userID={userID}
                      setShowEditUserGroupsModal={setShowEditUserGroupsModal}
                    />
                  </div>
                </div>

                <div className="flex-col">
                  <div className="modal__header">
                    <h4 className="title-tertiary">گروه های کاربر</h4>
                  </div>

                  <UserGroupsGrid userID={userID} userName={userName} />
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

export default UsersGrid;
