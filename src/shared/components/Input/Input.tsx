// IMPORTS
import { InputProps } from "./types";
import { useController } from "react-hook-form";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export const Input: FC<InputProps> = ({
  name,
  label,
  rules,
  required,
  type = "text",
  control,
  value = "",
  editable = true,
}) => {
  const { field, fieldState } = useController({
    control,
    defaultValue: value,
    name,
    rules,
  });

  // HANDLERS
  const handleRemoveField = () => {
    field.onChange("");
  };

  const content = (
    <div className="inputBox__form">
      {fieldState?.error && (
        <span className="error-form">{fieldState?.error.message}</span>
      )}
      <input
        autoComplete="off"
        value={field.value}
        onChange={field.onChange}
        disabled={!editable}
        type={type}
        id={name}
        className="inputBox__form--input"
        required
      />
      <label htmlFor={name} className="inputBox__form--label">
        {required && <span>*</span>} {label}
      </label>

      {field.value && editable ? (
        <div className="inputBox__form--icon">
          <IconButton color="default" size="small" onClick={handleRemoveField}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      ) : null}
    </div>
  );

  return content;
};
