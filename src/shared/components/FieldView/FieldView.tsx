// IMPORTS
import Checkbox from "@mui/material/Checkbox";
import {
  TextFieldProps,
  TextAreaFieldProps,
  CheckBoxFieldProps,
} from "./types";

export const FieldView = () => {};

FieldView.Text = ({ value, label }: TextFieldProps) => {
  return (
    <div className="inputBox__form">
      <div className="inputBox__form--readOnly-input">
        <div className="inputBox__form--readOnly-label">{label}</div>
        <div className="inputBox__form--readOnly-content">{value}</div>
      </div>
    </div>
  );
};

FieldView.TextArea = ({ value, label, classNames }: TextAreaFieldProps) => {
  return (
    <div className={`inputBox__form ${classNames}`}>
      <div className="inputBox__form--readOnly-input">
        <div className="inputBox__form--readOnly-label">{label}</div>
        <div className="inputBox__form--readOnly-content">{value}</div>
      </div>
    </div>
  );
};

FieldView.CheckBox = ({ label, checked }: CheckBoxFieldProps) => {
  return (
    <div className="checkboxContainer__item">
      <Checkbox
        checked={checked}
        size={"small"}
        color={"primary"}
        disabled={true}
        sx={{
          padding: 0.5,
        }}
      />
      <label className="checkboxContainer__label--disabled">{label}</label>
    </div>
  );
};
