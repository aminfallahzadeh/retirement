// IMPORTS
import { StylesConfig, ActionMeta } from "react-select";

export type Option = {
  value: string;
  label: string;
};

export type SelectInputProps = {
  label: string;
  name: string;
  required: boolean;
  defaultValue?: string;
  isMulti?: boolean;
  options: Option[];
  onChange?: (newValue: unknown, actionMeta?: ActionMeta<unknown>) => void;
  isDisabled?: boolean;
  value?: string;
  placeholder?: JSX.Element;
  customStyles?: StylesConfig;
  isLoading?: boolean;
  isClearable?: boolean;
};
