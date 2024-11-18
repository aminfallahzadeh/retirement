// IMPORTS
import { MRT_ColumnDef } from "material-react-table";

export type Request = {
  id: string;
  requestID: string;
  requestNO: string;
  requestTypeID: string;
  personID: string;
  requestTypeNameFa: string;
  personFirstName: string;
  personLastName: string;
  requestDate: string;
  requestText: string;
};

export type RequestTableData = Request[];

export type RequestColumn = MRT_ColumnDef<Request>[];
