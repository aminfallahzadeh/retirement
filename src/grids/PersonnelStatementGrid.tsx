// react imports
import { useMemo, useState, useEffect } from "react";

// rrd imports
import { useLocation } from "react-router-dom";

// redux imports
import { useGetPersonnelStatementQuery } from "@/features/personnel/personnelApi";

// mui imports
import { IconButton, Tooltip, Box, CircularProgress } from "@mui/material";
import { PaginationItem } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
  VisibilityOutlined as EyeIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// components
import Modal from "@/components/Modal";
import PersonnelStatementViewForm from "@/forms/PersonnelStatementViewForm";
import PersonnelStatementTemplate from "@/components/PersonnelStatementTemplate";

// helper imports
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
  separateByThousands,
} from "@/helper";

// utils imports
import { defaultTableOptions } from "@/config/mrt";

// library imports
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PersonnelStatementGrid() {
  // MAIN STATE
  const [statementID, setStatementID] = useState(null);

  // MODAL STATES
  const [showStatementInfoModal, setShowStatementInfoModal] = useState(false);

  const [rowSelection, setRowSelection] = useState({});
  const [personnelStatementTableData, setPersonnelStatementTableData] =
    useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  // ACTION QUERIES
  const {
    data: statements,
    isSuccess,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useGetPersonnelStatementQuery({ personID });

  const handleRefresh = () => {
    refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      const data = statements.itemList.map((item, index) => ({
        id: item.personnelStatementID,
        personnelStatementRowNum: index + 1,
        personnelStatementSerial: item.personnelStatementSerial,
        personnelStatementNumber: item.personnelStatementID,
        personnelStatementTypeName: item.personnelStatementTypeName,
        personnelStatementIssueDate: item.insertTime,
        personnelStatementRunDate: item.personnelStatementRunDate,
      }));

      setPersonnelStatementTableData(data);
    }
  }, [isSuccess, statements]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // HANDLERS
  const handleStatementViewModalChange = () => {
    setShowStatementInfoModal(true);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "personnelStatementRowNum",
        header: "ردیف",
        size: 20,
        enableColumnActions: false,
        enableSorting: false,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personnelStatementTypeName",
        header: "نوع حکم",
        size: 20,
      },
      {
        accessorKey: "personnelStatementSerial",
        header: "سریال حکم",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personnelStatementNumber",
        header: "شماره حکم",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianNumber(renderedCellValue) || "-"}</div>
        ),
      },
      {
        accessorKey: "personnelStatementIssueDate",
        header: "تاریخ صدور",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "personnelStatementRunDate",
        header: "تاریخ اجرا",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
        ),
      },
      {
        accessorKey: "downloadStatement",
        header: "مشاهده",
        enableSorting: false,
        enableColumnActions: false,
        size: 20,
        Cell: ({ row }) => (
          <Tooltip
            title={`سریال ${convertToPersianNumber(
              row.original.personnelStatementSerial
            )}`}
          >
            <IconButton
              color="primary"
              sx={{ padding: "0" }}
              onClick={handleStatementViewModalChange}
            >
              <EyeIcon />
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
    data: personnelStatementTableData,
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
      </Box>
    ),
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
    getRowId: (originalRow) => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  useEffect(() => {
    const id = Object.keys(table.getState().rowSelection)[0];

    if (id) {
      setStatementID(id);
    }
  }, [table, rowSelection]);

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
          {showStatementInfoModal && statementID ? (
            <Modal closeModal={() => setShowStatementInfoModal(false)}>
              <PersonnelStatementTemplate statementID={statementID} />
            </Modal>
          ) : null}
          <MaterialReactTable table={table} />
        </>
      )}
    </>
  );

  return content;
}

export default PersonnelStatementGrid;
