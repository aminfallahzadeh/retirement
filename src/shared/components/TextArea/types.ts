// IMPORTS
import { UseFormReturn, RegisterOptions } from "react-hook-form";

export type TextAreaProps = {
  name: string;
  label: string;
  required?: boolean;
  rules?: RegisterOptions;
  control: UseFormReturn["control"];
  value?: string;
  editable?: boolean;
  containerClassNames?: string;
};
