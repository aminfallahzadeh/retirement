// IMPORTS
import { MRT_ColumnDef } from "material-react-table";

export type Announce = {
  id: string;
  announceID: string;
  title: string;
  description: string;
  runDate: string;
};

export type AnnounceColumn = MRT_ColumnDef<Announce>[];
