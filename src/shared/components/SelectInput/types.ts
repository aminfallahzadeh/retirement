// // IMPORTS
// import { StylesConfig, ActionMeta } from "react-select";
// import { UseFormReturn, RegisterOptions } from "react-hook-form";

// export type Option = {
//   value: string;
//   label: string;
// };

// export type SelectInputProps = {
//   label: string;
//   name: string;
//   required: boolean;
//   defaultValue?: Option;
//   isMulti?: boolean;
//   options: Option[];
//   handleChange?: (newValue: unknown, actionMeta?: ActionMeta<unknown>) => void;
//   isDisabled?: boolean;
//   value?: Option;
//   customStyles?: StylesConfig;
//   isLoading?: boolean;
//   isClearable?: boolean;
//   rules?: RegisterOptions;
//   control: UseFormReturn["control"];
// };

// IMPORTS
import {
  StylesConfig,
  ActionMeta,
  SingleValue,
  MultiValue,
} from "react-select";
import {
  UseFormReturn,
  RegisterOptions,
  FieldErrors,
  FieldValues,
} from "react-hook-form";

export type OptionType = {
  value: string;
  label: string;
};

export type SelectInputProps<
  Option = SingleValue<OptionType> | MultiValue<OptionType>,
  IsMulti extends boolean = false
  //   Group extends GroupBase<Option> = GroupBase<Option>
> = {
  label: string;
  name: string;
  required: boolean;
  defaultValue?: IsMulti extends true ? Option[] : Option | null;
  isMulti?: boolean;
  options: Option[];
  handleChange?: (
    newValue: IsMulti extends true ? Option[] : Option | null,
    actionMeta: ActionMeta<Option>
  ) => void;
  onValueChange?: (
    value: IsMulti extends true ? Option[] : Option | null
  ) => void;
  isDisabled?: boolean;
  value?: IsMulti extends true ? Option[] : Option | null;
  customStyles?: StylesConfig;
  isLoading?: boolean;
  isClearable?: boolean;
  rules?: RegisterOptions;
  control: UseFormReturn["control"];
  errors?: FieldErrors<FieldValues>;
};
