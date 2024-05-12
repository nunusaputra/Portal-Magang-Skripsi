import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { type, name, placeholder, className } = props;
  return (
    <input
      type={type}
      className={className}
      name={name}
      id={name}
      placeholder={placeholder}
      ref={ref}
    />
  );
});

export default Input;
