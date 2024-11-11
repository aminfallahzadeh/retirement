// IMPORTS
import { TestInput } from "../TestInput";
import { FormFieldProps } from "./FormField.types";
import { SelectInput } from "../SelectInput";

export const FormField = () => {};

FormField.Input = ({
  inputData,
  register,
  errorMessage,
  disabled,
}: FormFieldProps) => {
  return (
    <TestInput
      item={inputData}
      register={register}
      errorMessage={errorMessage}
      disabled={disabled}
    />
  );
};

FormField.Select = {};
