import { forwardRef } from "react";
import Label from "./Label";
import Input from "./Input";

const InputForm = forwardRef((props, ref) => {
    const { type, name, placeholder, label, className } = props;
    return (
        <div className="mb-6">
            <Label htmlFor={name}>{label}</Label>
            <Input type={type} name={name} placeholder={placeholder} className={className} ref={ref} />
        </div>
    )
})

export default InputForm