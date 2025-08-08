import { Option } from "@/types/general"

export function parsedTimeStampToDate(timeStamp: string){
    try {
        return new Date(timeStamp).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    } catch (error) {
        return "Invalid Date Input"
    }
}

export function getOption(optionSources: Option[], value: string): Option{
    return optionSources.find(o => o.value === value) || { name: "", value: ""} // return default
}