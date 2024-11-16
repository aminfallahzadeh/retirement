import Select, { StylesConfig } from "react-select";
import { FC } from "react";
import makeAnimated from "react-select/animated";
import { SelectInputProps } from "./types";
import merge from "lodash.merge";
import { NO_OPTION_MESSAGE, LOADING_MESSAGE } from "@/constants/messages";

export const SelectInput: FC<SelectInputProps> = ({
  label,
  required,
  isDisabled,
  onChange,
  placeholder,
  options,
  isMulti,
  customStyles,
  defaultValue,
}) => {
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
    <>
      <Select
        components={animatedComponents}
        isClearable={!isDisabled}
        isDisabled={isDisabled}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        defaultValue={defaultValue}
        isMulti={isMulti}
        closeMenuOnSelect={isMulti}
        styles={mergedStyles}
        noOptionsMessage={() => NO_OPTION_MESSAGE}
        loadingMessage={() => LOADING_MESSAGE}
      />

      <label
      // className={
      //   form_data?.genderID
      //     ? "inputBox__form--readOnly-label"
      //     : "inputBox__form--readOnly-label-hidden"
      // }
      >
        {/* {required && <span>*</span>} {label} */}
      </label>

      {/* {errors.genderID && <span className="error-form"> جنسیت اجباری است</span>} */}
    </>
  );
};
