// IMPORTS
import { UseFormReturn, RegisterOptions } from "react-hook-form";

export interface InputProps {
  name: string;
  label: string;
  required?: boolean;
  rules?: RegisterOptions;
  type?: string;
  control: UseFormReturn["control"];
  value?: string;
  editable?: boolean;
  isLoading?: boolean;
}
