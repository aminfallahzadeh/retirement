// IMPORTS
import {
  UseFormReturn,
  DeepMap,
  FieldError,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export interface InputProps {
  name: string;
  label: string;
  required?: boolean;
  register: UseFormReturn["register"];
  rules?: RegisterOptions;
  disabled?: boolean;
  type?: string;
  errors?: DeepMap<FieldValues, FieldError>;
}
