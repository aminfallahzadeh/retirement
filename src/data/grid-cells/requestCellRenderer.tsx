// RRD
import { Link } from "react-router-dom";

// MUI
import { IconButton, Tooltip } from "@mui/material";

// TYPES
import { RoleType } from "@/types/RoleDataType";

// HELPERS
import {
  convertToPersianDateFormatted,
  convertToPersianNumber,
} from "../../helper.js";
import {
  VisibilityOutlined as EyeIcon,
  TextSnippetOutlined as CheckIcon,
} from "@mui/icons-material";

export const requestCellRenderer = (selectedRole: RoleType) => ({
  requestRowNum: ({ renderedCellValue }: { renderedCellValue: any }) => (
    <div>{convertToPersianNumber(renderedCellValue)}</div>
  ),
  requestNO: ({ renderedCellValue }: { renderedCellValue: any }) => (
    <div>{convertToPersianNumber(renderedCellValue)}</div>
  ),
  date: ({ renderedCellValue }: { renderedCellValue: any }) => (
    <div>{convertToPersianDateFormatted(renderedCellValue)}</div>
  ),
  senderInfo: ({ row }: { row: any }) => (
    <Tooltip
      title={
        <>
          <span>{row.original.requestTypeNameFa}</span> <br />
          <span>{row.original.personName}</span>
        </>
      }
    >
      <Link
        to={
          row.original.requestTypeID === "62A54585-F331-434A-9027-C9F3060F683A"
            ? `/retirement-organization/group-slips?requestID=${row.original.id}`
            : row.original.requestTypeID ===
              "EC1E7E50-9815-442F-9CCB-27F47AB05199"
            ? `/retirement-organization/group-slips?requestID=${row.original.id}&personID=${row.original.personID}`
            : row.original.requestTypeID ===
              "6E7BA26E-A1DC-4A5E-9700-17820A36158D"
            ? `/retirement-organization/batch-statements?requestID=${row.original.id}`
            : `/retirement-organization/retired?personID=${row.original.personID}&Role=${selectedRole?.value}&requestID=${row.original.id}`
        }
      >
        <span>
          <IconButton color="success" sx={{ padding: "0" }}>
            <CheckIcon color="success" />
          </IconButton>
        </span>
      </Link>
    </Tooltip>
  ),
  observe: ({ row }: { row: any }) => (
    <Tooltip title={convertToPersianNumber(row.original.requestNO)}>
      <Link
        to={`/retirement-organization/request?requestID=${row.id}&Role=${selectedRole?.value}&type=${row.original.requestTypeID}`}
      >
        <span>
          <IconButton sx={{ padding: "0" }} color="info">
            <EyeIcon color="info" />
          </IconButton>
        </span>
      </Link>
    </Tooltip>
  ),
});
