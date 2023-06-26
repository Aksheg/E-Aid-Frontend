interface Props {
  type?: string;
  value?: any;
  onChange?: (param: any) => void;
  placeHolder?: string;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean | undefined;
  disabled?: boolean;
  defaultValue?: string;
  inputStyle?: any;
  accept?: string;
}

export const InputField = (props: Props) => {
  const {
    type,
    value,
    onChange,
    placeHolder,
    className,
    id,
    name,
    required,
    disabled,
    defaultValue,
    inputStyle,
    accept,
  } = props;

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeHolder}
      id={id}
      className={className}
      name={name}
      required={required}
      disabled={disabled}
      defaultValue={defaultValue}
      style={inputStyle}
      accept={accept}
    />
  );
};
