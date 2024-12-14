// IMPORTS
import {
  UseFormReturn,
  RegisterOptions,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import { InputDatePickerProps } from "jalaali-react-date-picker";

export type DatePickerProps = {
  name: string;
  label: string;
  required: boolean;
  disabled?: boolean;
  format?: string;
  rules?: RegisterOptions;
  control: UseFormReturn["control"];
  errors?: FieldErrors<FieldValues>;
  setValue: UseFormReturn["setValue"];
};

export type ExtendedInputDatePickerProps = InputDatePickerProps & {
  pickerProps?: {
    ref?: React.Ref<HTMLElement>;
  };
};
