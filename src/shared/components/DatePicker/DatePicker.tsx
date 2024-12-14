// IMPORTS
import { useState, useRef } from "react";
import "jalaali-react-date-picker/lib/styles/index.css";
import { Controller } from "react-hook-form";
import { InputDatePicker } from "jalaali-react-date-picker";
import { DatePickerProps, ExtendedInputDatePickerProps } from "./types";
import { useCloseCalender } from "@/hooks/useCloseCalender";
import { IconButton } from "@mui/material";
import CalenderIcon from "@mui/icons-material/CalendarTodayOutlined";
import CloseIcon from "@mui/icons-material/Close";

export const DatePicker = ({
  name,
  label,
  disabled,
  format = "jYYYY/jMM/jDD",
  rules,
  control,
  required = false,
  errors,
  setValue,
}: DatePickerProps) => {
  // STATES
  const calenderRef = useRef(null);
  const [open, toggleOpen] = useState<boolean>(false);

  // HANDLERS
  const handleCalenderOpenChange = (open: boolean) => {
    toggleOpen(open);
  };

  const handleRemoveField = () => {
    setValue(name, null);
  };

  useCloseCalender([calenderRef], [toggleOpen]);

  return (
    <div className="inputBox__form">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <InputDatePicker
            id={name}
            aria-label={name}
            disabled={disabled}
            format={format}
            value={value}
            open={open}
            suffixIcon={
              value && !disabled ? (
                <IconButton
                  color="default"
                  size="small"
                  onClick={handleRemoveField}
                >
                  <CloseIcon />
                </IconButton>
              ) : (
                <CalenderIcon color="action" />
              )
            }
            defaultValue={null}
            onOpenChange={handleCalenderOpenChange}
            onChange={(val) => {
              toggleOpen(false);
              onChange(val);
            }}
            pickerProps={
              {
                ...(calenderRef && { ref: calenderRef }),
              } as ExtendedInputDatePickerProps
            }
            style={{
              border: "none",
              cursor: "pointer",
            }}
            wrapperStyle={{
              border: "1px solid var(--color-input-border)",
              width: "100%",
              height: "100%",
              paddingLeft: "20px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        )}
      />

      <label htmlFor={name} className="inputBox__form--readOnly-label">
        {required && <span>*</span>} {label}
      </label>

      {errors && (
        <span className="error-form">{errors?.[name]?.message as string}</span>
      )}
    </div>
  );
};
