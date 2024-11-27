// IMPORTS
import { SelectedItem } from "../types";

export type ArchiveStructureFormProps = {
  setCloseModal: () => void;
  item: SelectedItem;
  refetch: () => void;
};

export type ArchiveFormProps = {
  setCloseModal: () => void;
  item: SelectedItem;
  refetch: () => void;
};
