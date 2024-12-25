// IMPORTS
import { useState, useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { NumberInputProps } from "./types";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const NumberInput = ({
  name,
  label,
  required,
  rules,
  control,
  editable = true,
  errors,
  setValue,
  separate,
  float,
}: NumberInputProps) => {
  // CONSTS
  const value = useWatch({
    control,
    name,
  });

  // STATES
  const [hasValue, setHasValue] = useState<boolean>(!!value);

  // EFFECTS
  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  // HANDLERS
  const handleRemoveField = () => {
    setValue(name, "");
  };

  return (
    <div className="inputBox__form">
      {errors && (
        <span className="error-form">{errors?.[name]?.message as string}</span>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <NumericFormat
            value={value}
            allowLeadingZeros
            thousandSeparator={separate ? "," : ""}
            onValueChange={(val) => {
              onChange(float ? val.floatValue : val.value);
              setHasValue(!!val);
            }}
            className="inputBox__form--input"
            id={name}
            disabled={!editable}
            required
          />
        )}
      />

      <label htmlFor={name} className="inputBox__form--label">
        {required && <span>*</span>} {label}
      </label>

      {hasValue && editable ? (
        <div className="inputBox__form--icon">
          <IconButton color="default" size="small" onClick={handleRemoveField}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      ) : null}
    </div>
  );
};
