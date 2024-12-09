// IMPORTS
import { useContext, createContext } from "react";
import { PersonnelItem } from "@/shared/types/personnel";
import { MRT_ColumnDef } from "material-react-table";

const ActionsContext = createContext<MRT_ColumnDef<PersonnelItem>[]>([]);

const useActions = () => {
  const context = useContext(ActionsContext);
  if (!context) {
    throw new Error("useActions must be used within an ActionsProvider");
  }
  return context;
};

export { useActions, ActionsContext };
