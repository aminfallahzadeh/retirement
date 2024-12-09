// IMPORTS
import { ActionsContext } from "./useActions";
import { PersonnelItem } from "@/shared/types/personnel";
import { MRT_ColumnDef } from "material-react-table";

export const GlobalSearchActionsProvider = ({
  children,
  actions,
}: {
  children: React.ReactNode;
  actions?: MRT_ColumnDef<PersonnelItem>[];
}) => {
  return (
    <ActionsContext.Provider value={actions || []}>
      {children}
    </ActionsContext.Provider>
  );
};
