// IMPORTS
import { FC } from "react";
import { TestInputProps } from "./types";

export const TestInput: FC<TestInputProps> = ({
  item,
  register,
  disabled,
  errorMessage,
}) => {
  const content = (
    <div className="inputBox__form">
      {errorMessage && <span className="error-form">{errorMessage}</span>}
      <input
        autoComplete="false"
        disabled={disabled}
        type={item?.type}
        id={item?.name}
        className="inputBox__form--input"
        required
        {...(register && register(item?.name, item?.validators))}
      />
      <label htmlFor={item?.name} className="inputBox__form--label">
        {item?.validators?.required && <span>*</span>} {item?.label}
      </label>
    </div>
  );

  return content;
};
