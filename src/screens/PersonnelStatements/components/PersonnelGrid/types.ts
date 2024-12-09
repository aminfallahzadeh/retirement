// IMPORTS
import { MRT_ColumnDef } from "material-react-table";

export type Personnel = {
  id: string;
  personID: string;
  personDeathDate: string;
  personnelID: string;
  personNationalCode: string;
  personFirstName: string;
  personLastName: string;
};

type PersonnelItem = {
  id: string;
  personnelRowNum: number;
  personnelDeathDate: string;
  personnelID: string;
  personnelNationalCode: string;
  personnelFirstName: string;
  personnelLastName: string;
};

export type PersonnelTableData = PersonnelItem[];

export type PersonnelGridProps = {
  isLoading: boolean;
  isFetching: boolean;
  data: PersonnelTableData;
};

export type PersonnelColumns = MRT_ColumnDef<PersonnelItem>[];
