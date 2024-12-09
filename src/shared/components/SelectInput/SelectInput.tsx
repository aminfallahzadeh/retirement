// IMPORTS
import { useState } from "react";
import Select, { StylesConfig, SingleValue } from "react-select";
import { OptionType } from "@/shared/types/options";
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
  isLoading,
  rules,
  control,
  onValueChange,
  errors,
}) => {
  const [hasValue, setHasValue] = useState<boolean>(false);

  const selectStyles: StylesConfig = {
    container: (base) => ({
      ...base,
      position: "relative",
      height: "100%",
    }),
    control: (base, state) => ({
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
      borderColor: state.isDisabled
        ? "var(--color-disbaled-input-border)"
        : "var(--color-input-border)",
    }),
    placeholder: (base) => ({
      ...base,
      color: "var(--color-input-border)",
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
        render={({ field: { onChange, value } }) => (
          <Select
            id={name}
            value={value}
            components={animatedComponents}
            isClearable={isClearable}
            isDisabled={isDisabled || isLoading}
            isLoading={isLoading}
            onChange={(val) => {
              setHasValue(!!val);
              onValueChange?.(val as SingleValue<OptionType>);
              onChange(val);
            }}
            placeholder={
              <div className="react-select-placeholder">
                {isLoading ? (
                  LOADING_MESSAGE
                ) : (
                  <>
                    {required && <span>*</span>} {label}
                  </>
                )}
              </div>
            }
            options={options}
            isMulti={isMulti}
            closeMenuOnSelect={!isMulti}
            styles={mergedStyles}
            noOptionsMessage={() => NO_OPTION_MESSAGE}
            loadingMessage={() => LOADING_MESSAGE}
          />
        )}
      />

      <label
        htmlFor={name}
        className={hasValue ? "label--selected" : "label--unselected"}
      >
        {required && <span>*</span>} {label}
      </label>

      {errors && (
        <span className="error-form">{errors?.[name]?.message as string}</span>
      )}
    </div>
  );
};
