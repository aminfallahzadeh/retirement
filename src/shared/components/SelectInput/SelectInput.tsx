import Select from "react-select";
import { FC } from "react";
import makeAnimated from "react-select/animated";
import { SelectInputProps } from "./SelectInput.types";
import merge from "lodash.merge";
import { selectStyles } from "@/utils/reactSelect";

export const SelectInput: FC<SelectInputProps> = ({
  isDisabled,
  onChange,
  placeholder,
  options,
  isMulti,
  customStyles,
}) => {
  const animatedComponents = makeAnimated();
  const mergedStyles = merge({}, selectStyles, customStyles);

  return (
    <div className="inputBox__form">
      <Select
        components={animatedComponents}
        isClearable={!isDisabled}
        isDisabled={isDisabled}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
        closeMenuOnSelect={isMulti}
        styles={mergedStyles}
      />

      {/* <label
        className={
          form_data?.genderID
            ? "inputBox__form--readOnly-label"
            : "inputBox__form--readOnly-label-hidden"
        }
      >
        <span>*</span> جنسیت
      </label> */}

      {/* {errors.genderID && <span className="error-form"> جنسیت اجباری است</span>} */}
    </div>
  );
};
