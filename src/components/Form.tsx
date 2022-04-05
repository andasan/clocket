import { InputProps, LabelAndInputProps } from "../types";

export const LabelAndInput: React.FC<LabelAndInputProps> = ({
  label,
  inputType,
  inputName,
  handleChange,
  value
}) => {
  return (
    <div className="flex flex-col mb-2 form-control">
      <label className="label" htmlFor="name">
        {label}
      </label>
      <Input
        inputType={inputType}
        inputName={inputName}
        handleChange={handleChange}
        value={value}
      />
    </div>
  );
};

export const Input: React.FC<InputProps> = ({
  inputType,
  inputName,
  handleChange,
  value
}) => {
  return (
    <input
      className="input input-bordered"
      type={inputType}
      name={inputName}
      id={inputName}
      onChange={handleChange}
      value={value}
    />
  );
};
