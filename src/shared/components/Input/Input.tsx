// IMPORTS
import { InputProps } from "./types";

export const Input: React.FC<InputProps> = ({
  name = "",
  label,
  register,
  rules = {},
  required,
  disabled,
  type = "text",
  errors,
}) => {
  const content = (
    <div className="inputBox__form">
      {errors && <span className="error-form">{errors?.[name]?.message}</span>}
      <input
        autoComplete="false"
        disabled={disabled}
        type={type}
        id={name}
        className="inputBox__form--input"
        required
        {...(register && register(name, rules))}
      />
      <label htmlFor="personFirstName" className="inputBox__form--label">
        {required && <span>*</span>} {label}
      </label>
    </div>
  );

  return content;
};
