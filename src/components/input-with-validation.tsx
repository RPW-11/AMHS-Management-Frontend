import { ChangeEvent } from "react"
import { Input } from "./ui/input"

interface InputWithValidationProps {
    validationFunction: () => string
    value?: string
    onChange?: (value: string) => void,
    disabled?: boolean,
    placeholder?: string
}

const InputWithValidation = ({
    validationFunction,
    value,
    onChange,
    placeholder,
    disabled = false
}:InputWithValidationProps) => {
    const errorMessage = validationFunction();
    const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value)
        }
    }

    return (
        <div className="space-y-1">
            <Input placeholder={placeholder} disabled={disabled} value={value} onChange={updateValue} />
            {errorMessage && <p className="text-red-600 text-xs font-normal">{errorMessage}</p>}
        </div>
    )
}

export default InputWithValidation