// IMPORTS
import {
  UseFormReturn,
  RegisterOptions,
  FieldValues,
  FieldErrors,
} from "react-hook-form";

export type NumberInputProps = {
  name: string;
  label: string;
  required?: boolean;
  rules?: RegisterOptions;
  control: UseFormReturn["control"];
  editable?: boolean;
  isLoading?: boolean;
  errors?: FieldErrors<FieldValues>;
  setValue: UseFormReturn["setValue"];
  separate: boolean;
  float: boolean;
};
