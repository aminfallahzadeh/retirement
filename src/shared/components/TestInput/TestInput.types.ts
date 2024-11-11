// IMPORTS
import { FieldValues, UseFormRegister } from "react-hook-form";
import { FormEvent } from "react";
import { FormStructure } from "@/shared/types/form";

export type TestInputProps = {
  item: FormStructure;
  errorMessage?: string;
  disabled?: boolean;
  register?: UseFormRegister<FieldValues>;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
};
