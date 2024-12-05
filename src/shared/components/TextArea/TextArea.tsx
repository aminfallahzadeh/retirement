// IMPORTS
import { useController } from "react-hook-form";
import { FC } from "react";
import { Close as CloseIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { TextAreaProps } from "./types";

export const TextArea: FC<TextAreaProps> = ({
  name,
  label,
  required,
  rules,
  control,
  value = "",
  editable = true,
  colSpan = "",
  rowSpan = "",
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
    <div className={`inputBox__form ${colSpan}  ${rowSpan}`}>
      {fieldState?.error && (
        <span className="error-form">{fieldState?.error.message}</span>
      )}

      <textarea
        disabled={!editable}
        value={field.value}
        onChange={field.onChange}
        id={name}
        name={name}
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
