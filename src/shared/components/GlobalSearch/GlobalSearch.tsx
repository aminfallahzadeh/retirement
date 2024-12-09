// IMPORTS
import { SearchForm } from "./forms";
import { PersonnelColumns } from "./types";
import { GlobalSearchActionsProvider } from "@/context/ActionsContext";

export const GlobalSearch = ({
  actions = [],
}: {
  actions?: PersonnelColumns;
}) => {
  return (
    <GlobalSearchActionsProvider actions={actions}>
      <SearchForm />
    </GlobalSearchActionsProvider>
  );
};
