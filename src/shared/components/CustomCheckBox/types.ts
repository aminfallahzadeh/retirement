// IMPORTS
import {
  UseFormReturn,
  FieldErrors,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

export type CustomCheckBoxProps = {
  label: string;
  name: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  disabled?: boolean;
  control: UseFormReturn["control"];
  errors?: FieldErrors<FieldValues>;
  rules?: RegisterOptions;
};
