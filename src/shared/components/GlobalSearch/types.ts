// IMPORTS
import { MRT_ColumnDef } from "material-react-table";
import { PersonnelItem } from "@/shared/types/personnel";

export type Personnel = {
  id: string;
  personID: string;
  personDeathDate: string;
  personnelID: string;
  personNationalCode: string;
  personFirstName: string;
  personLastName: string;
};

export type PersonnelGridProps = {
  isLoading: boolean;
  isFetching: boolean;
  data: PersonnelTableData;
};
export type PersonnelTableData = PersonnelItem[];

export type PersonnelColumns = MRT_ColumnDef<PersonnelItem>[];

export type GlobalSearchProps = {
  actions?: PersonnelColumns;
};
