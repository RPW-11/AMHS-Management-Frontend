import { Option } from "../types/general"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

interface SelectOptionProps {
    value: Option
    options: Option[]
    onValueChange: (value: Option) => void
    labelName: string
    placeholder: string
    disabled?: boolean
}

const SelectOption = ({
    value,
    options,
    onValueChange,
    labelName,
    placeholder,
    disabled = false
}: SelectOptionProps) => {

    const handleValueChange = (value: string) => {
        for (const option of options) {
            if (option.value === value) {
                onValueChange(option)
            }
        }
    }

    return (
        <Select disabled={disabled} value={value.value} onValueChange={handleValueChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>{ labelName }</SelectLabel>
                {options.map(option => (
                    <SelectItem value={option.value} key={option.value}>{ option.name }</SelectItem>
                ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectOption