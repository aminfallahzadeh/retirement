// // IMPORTS
import { useState } from "react";
import Select, { StylesConfig, SingleValue } from "react-select";
import { OptionType } from "./types";
import { Controller } from "react-hook-form";
import { FC } from "react";
import makeAnimated from "react-select/animated";
import { SelectInputProps } from "./types";
import merge from "lodash.merge";
import { NO_OPTION_MESSAGE, LOADING_MESSAGE } from "@/constants/messages";

export const SelectInput: FC<SelectInputProps> = ({
  name,
  label,
  required,
  isDisabled,
  isClearable,
  options,
  isMulti = false,
  customStyles,
  defaultValue,
  rules,
  control,
  onValueChange,
  errors,
}) => {
  const [hasValue, setHasValue] = useState(!!defaultValue);

  const selectStyles: StylesConfig = {
    container: (base) => ({
      ...base,
      position: "relative",
      height: "100%",
    }),
    control: (base) => ({
      ...base,
      fontFamily: "IranYekan",
      cursor: "pointer",
      fontSize: "12px",
      height: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
      overflow: "auto",
      textOverflow: "ellipsis",
      position: "relative",
      borderColor: "var(--color-input-border)",
    }),
    menu: (base) => ({
      ...base,
      fontFamily: "IranYekan",
      zIndex: "5",
    }),
    option: (base) => ({
      ...base,
      cursor: "pointer",
    }),
    menuList: (base) => ({
      ...base,
      fontFamily: "IranYekan",
      zIndex: "5",
    }),
  };

  const animatedComponents = makeAnimated();
  const mergedStyles = merge({}, selectStyles, customStyles);

  return (
    <div className="relative w-full h-full">
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field: { onChange } }) => (
          <Select
            components={animatedComponents}
            isClearable={isClearable}
            isDisabled={isDisabled}
            onChange={(val) => {
              setHasValue(!!val);
              onValueChange?.(val as SingleValue<OptionType>);
              onChange(val);
            }}
            placeholder={
              <div className="react-select-placeholder">
                {required && <span>*</span>} {label}
              </div>
            }
            options={options}
            defaultValue={defaultValue}
            isMulti={isMulti}
            closeMenuOnSelect={!isMulti}
            styles={mergedStyles}
            noOptionsMessage={() => NO_OPTION_MESSAGE}
            loadingMessage={() => LOADING_MESSAGE}
          />
        )}
      />

      <label className={hasValue ? "label--selected" : "label--unselected"}>
        {required && <span>*</span>} {label}
      </label>

      {errors && (
        <span className="error-form">{errors?.[name]?.message as string}</span>
      )}
    </div>
  );
};
