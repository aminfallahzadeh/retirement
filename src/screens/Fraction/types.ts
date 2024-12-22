// IMPORTS
import { MRT_ColumnDef } from "material-react-table";

export type Statement = {
  id: string;
  personnelStatementRowNo: string;
  personnelStatementID: string;
  personnelStatementSerial: string;
  personnelStatementNumber: string;
  insertTime: string;
  personnelStatementRunDate: string;
};

export type StatementColumn = MRT_ColumnDef<Statement>[];
