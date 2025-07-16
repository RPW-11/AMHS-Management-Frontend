import { Button } from "@/components/ui/button"
import { Calendar as CalendarComp } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "lucide-react"
import { useState } from "react"

interface CustomDatePickerProps {
    date?: Date
    onDateChange?: (newDate: Date) => void
}

const CustomDatePicker = ({
    date,
    onDateChange
}: CustomDatePickerProps) => {
    const [localDate, setLocalDate] = useState<Date>(date || new Date())

    const handleDateChange = (newDate: Date) => {
        if (newDate && onDateChange){
            onDateChange(newDate)
        }
        setLocalDate(newDate)
    }

    const formatCurrDateToStr = (): string => {
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',    
            day: 'numeric',     
            month: 'short',     
            year: 'numeric',   
        }).format(localDate).toString()
    }
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size={"sm"} variant={"outline"}>
                    <Calendar/>
                    { formatCurrDateToStr() }
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                <CalendarComp
                required
                mode="single"
                selected={localDate}
                captionLayout="dropdown"
                onSelect={handleDateChange}/>
            </PopoverContent>
        </Popover>
    )
}

export default CustomDatePicker;