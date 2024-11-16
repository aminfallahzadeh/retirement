// IMPORTS
import { FieldValues, UseFormRegister } from "react-hook-form";
import { FormStructure } from "@/shared/types/form";

export type FormFieldProps = {
  inputData: FormStructure;
  register: UseFormRegister<FieldValues>;
  errorMessage: string;
  disabled?: boolean;
};
