interface Props {
  type: string;
  className: string;
  id?: string;
  value?: any;
  placeholder: string;
  name: string;
  required: boolean;
  disabled: boolean;
  onChange: (params: any) => void;
  style?: any;
  accept?: any;
}
const InputComponent = (props: Props) => {
  const {
    type,
    className,
    id,
    value,
    placeholder,
    name,
    required,
    disabled,
    onChange,
    style,
    accept,
  } = props;
  return (
    <input
      type={type}
      className={className}
      value={value}
      placeholder={placeholder}
      name={name}
      required={required}
      disabled={disabled}
      onChange={onChange}
      id={id}
      style={style}
      accept={accept}
    />
  );
};

export default InputComponent;
