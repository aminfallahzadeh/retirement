// IMPORTS
import Checkbox from "@mui/material/Checkbox";
import { CustomCheckBoxProps } from "./types";
import { Controller } from "react-hook-form";

export const CustomCheckBox = ({
  label,
  size = "small",
  color = "primary",
  disabled,
  control,
  name,
  errors,
  rules,
}: CustomCheckBoxProps) => {
  return (
    <div className="checkboxContainer__item">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            id={name}
            checked={!!value}
            onChange={(event) => onChange(event.target.checked)}
            size={size}
            color={color}
            disabled={disabled}
            sx={{
              padding: 0.5,
            }}
          />
        )}
      />

      <label
        htmlFor={name}
        className={
          disabled
            ? "checkboxContainer__label--disabled prevent-select"
            : "checkboxContainer__label prevent-select"
        }
      >
        {label}
      </label>
    </div>
  );
};
