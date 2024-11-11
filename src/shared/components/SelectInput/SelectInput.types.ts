// IMPORTS
import { StylesConfig, ActionMeta } from "react-select";

type option = {
  label: string;
  value: string;
};

export type SelectInputProps = {
  isMulti?: boolean;
  options: option[];
  onChange?: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
  isDisabled?: boolean;
  value?: string;
  placeholder?: JSX.Element;
  customStyles?: StylesConfig;
  isLoading?: boolean;
};
