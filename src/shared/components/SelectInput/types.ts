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
import { OptionType } from "@/shared/types/options";

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
