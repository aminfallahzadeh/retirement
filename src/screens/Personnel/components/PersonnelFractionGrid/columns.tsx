// IMPORTS
import { MRT_ColumnDef } from "material-react-table";
import { Tooltip } from "@mui/material";
import { PersonnelFraction } from "./types";
import { separateByThousand } from "@/helpers/numberConverter";
import {
  FARVARDIN,
  ORDIBEHESHT,
  KHORDAD,
  TIR,
  MORDAD,
  SHAHRIVAR,
  ABAN,
  AZAR,
  DEY,
  BAHMAN,
  ESFAND,
  MEHR,
} from "@/constants/consts/months";
import {
  ROW_NO,
  YEAR,
  RECORD_TYPE,
  CHEST_NAME,
  ORGANIZATION,
  MANAGER_SHARE,
  PERSONNEL_SHARE,
} from "@/constants/const";
import { separateByThousands } from "@/helper";

export const personnelFractionColumns =
  (): MRT_ColumnDef<PersonnelFraction>[] => [
    {
      accessorKey: "fractionRowNo",
      header: ROW_NO,
      size: 20,
    },
    {
      accessorKey: "fractionYear",
      header: YEAR,
      size: 20,
    },
    {
      accessorKey: "fractionTypeName",
      header: RECORD_TYPE,
      size: 20,
    },
    {
      accessorKey: "fractionChestName",
      header: CHEST_NAME,
      size: 20,
    },
    {
      accessorKey: "fractionOrganization",
      header: ORGANIZATION,
      size: 20,
    },
    {
      accessorKey: "fractionFarvardin",
      header: FARVARDIN,
      size: 20,
      Cell: ({ renderedCellValue, row }) => (
        <Tooltip
          title={
            <div>
              {`${MANAGER_SHARE} : ${separateByThousands(
                row.original.fractionOrganizationTotalAmount1
              )}`}
              <br />
              {`${PERSONNEL_SHARE} : ${separateByThousand(
                row.original.fractionPersonnelTotalAmount1
              )}`}
            </div>
          }
        >
          <div>{separateByThousand(renderedCellValue as string)}</div>
        </Tooltip>
      ),
    },
    {
      accessorKey: "fractionOrdibehesht",
      header: ORDIBEHESHT,
      size: 20,
      Cell: ({ renderedCellValue, row }) => (
        <Tooltip
          title={
            <div>
              {`${MANAGER_SHARE} : ${separateByThousand(
                row.original.fractionOrganizationTotalAmount2
              )}`}
              <br />
              {`${PERSONNEL_SHARE} : ${separateByThousand(
                row.original.fractionPersonnelTotalAmount2
              )}`}
            </div>
          }
        >
          <div>{separateByThousand(renderedCellValue as string)}</div>
        </Tooltip>
      ),
    },
    {
      accessorKey: "fractionKhordad",
      header: KHORDAD,
      size: 20,
      Cell: ({ renderedCellValue, row }) => (
        <Tooltip
          title={
            <div>
              {`${MANAGER_SHARE} : ${separateByThousand(
                row.original.fractionOrganizationTotalAmount3
              )}`}
              <br />
              {`${PERSONNEL_SHARE} : ${separateByThousand(
                row.original.fractionPersonnelTotalAmount3
              )}`}
            </div>
          }
        >
          <div>{separateByThousand(renderedCellValue as string)}</div>
        </Tooltip>
      ),
    },
    {
      accessorKey: "fractionTir",
      header: TIR,
      size: 20,
      Cell: ({ renderedCellValue, row }) => (
        <Tooltip
          title={
            <div>
              {`${MANAGER_SHARE} : ${separateByThousand(
                row.original.fractionOrganizationTotalAmount4
              )}`}
              <br />
              {`${PERSONNEL_SHARE} : ${separateByThousand(
                row.original.fractionPersonnelTotalAmount4
              )}`}
            </div>
          }
        >
          <div>{separateByThousand(renderedCellValue as string)}</div>
        </Tooltip>
      ),
    },
    {
      accessorKey: "fractionMordad",
      header: MORDAD,
      size: 20,
      Cell: ({ renderedCellValue, row }) => (
        <Tooltip
          title={
            <div>
              {`${MANAGER_SHARE} : ${separateByThousand(
                row.original.fractionOrganizationTotalAmount5
              )}`}
              <br />
              {`${PERSONNEL_SHARE} : ${separateByThousand(
                row.original.fractionPersonnelTotalAmount5
              )}`}
            </div>
          }
        >
          <div>{separateByThousand(renderedCellValue as string)}</div>
        </Tooltip>
      ),
    },
    {
      accessorKey: "fractionShahrivar",
      header: SHAHRIVAR,
      size: 20,
      Cell: ({ renderedCellValue, row }) => (
        <Tooltip
          title={
            <div>
              {`${MANAGER_SHARE} : ${separateByThousand(
                row.original.fractionOrganizationTotalAmount6
              )}`}
              <br />
              {`${PERSONNEL_SHARE} : ${separateByThousand(
                row.original.fractionPersonnelTotalAmount6
              )}`}
            </div>
          }
        >
          <div>{separateByThousand(renderedCellValue as string)}</div>
        </Tooltip>
      ),
    },
    {
      accessorKey: "fractionMehr",
      header: MEHR,
      size: 20,
      Cell: ({ renderedCellValue, row }) => (
        <Tooltip
          title={
            <div>
              {`${MANAGER_SHARE} : ${separateByThousand(
                row.original.fractionOrganizationTotalAmount7
              )}`}
              <br />
              {`${PERSONNEL_SHARE} : ${separateByThousand(
                row.original.fractionPersonnelTotalAmount7
              )}`}
            </div>
          }
        >
          <div>{separateByThousand(renderedCellValue as string)}</div>
        </Tooltip>
      ),
    },
    {
      accessorKey: "fractionAban",
      header: ABAN,
      size: 20,
      Cell: ({ renderedCellValue, row }) => (
        <Tooltip
          title={
            <div>
              {`${MANAGER_SHARE} : ${separateByThousand(
                row.original.fractionOrganizationTotalAmount8
              )}`}
              <br />
              {`${PERSONNEL_SHARE} : ${separateByThousand(
                row.original.fractionPersonnelTotalAmount8
              )}`}
            </div>
          }
        >
          <div>{separateByThousand(renderedCellValue as string)}</div>
        </Tooltip>
      ),
    },
    {
      accessorKey: "fractionAzar",
      header: AZAR,
      size: 20,
      Cell: ({ renderedCellValue, row }) => (
        <Tooltip
          title={
            <div>
              {`${MANAGER_SHARE} : ${separateByThousand(
                row.original.fractionOrganizationTotalAmount9
              )}`}
              <br />
              {`${PERSONNEL_SHARE} : ${separateByThousand(
                row.original.fractionPersonnelTotalAmount9
              )}`}
            </div>
          }
        >
          <div>{separateByThousand(renderedCellValue as string)}</div>
        </Tooltip>
      ),
    },
    {
      accessorKey: "fractionDey",
      header: DEY,
      size: 20,
      Cell: ({ renderedCellValue, row }) => (
        <Tooltip
          title={
            <div>
              {`${MANAGER_SHARE} : ${separateByThousand(
                row.original.fractionOrganizationTotalAmount10
              )}`}
              <br />
              {`${PERSONNEL_SHARE} : ${separateByThousand(
                row.original.fractionPersonnelTotalAmount10
              )}`}
            </div>
          }
        >
          <div>{separateByThousand(renderedCellValue as string)}</div>
        </Tooltip>
      ),
    },
    {
      accessorKey: "fractionBahman",
      header: BAHMAN,
      size: 20,
      Cell: ({ renderedCellValue, row }) => (
        <Tooltip
          title={
            <div>
              {`${MANAGER_SHARE} : ${separateByThousand(
                row.original.fractionOrganizationTotalAmount11
              )}`}
              <br />
              {`${PERSONNEL_SHARE} : ${separateByThousand(
                row.original.fractionPersonnelTotalAmount11
              )}`}
            </div>
          }
        >
          <div>{separateByThousand(renderedCellValue as string)}</div>
        </Tooltip>
      ),
    },
    {
      accessorKey: "fractionEsfand",
      header: ESFAND,
      size: 20,
      Cell: ({ renderedCellValue, row }) => (
        <Tooltip
          title={
            <div>
              {`${MANAGER_SHARE} : ${separateByThousand(
                row.original.fractionOrganizationTotalAmount12
              )}`}
              <br />
              {`${PERSONNEL_SHARE} : ${separateByThousand(
                row.original.fractionPersonnelTotalAmount12
              )}`}
            </div>
          }
        >
          <div>{separateByThousand(renderedCellValue as string)}</div>
        </Tooltip>
      ),
    },
  ];
