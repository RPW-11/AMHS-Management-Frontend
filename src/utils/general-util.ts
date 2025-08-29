import { Option } from "@/types/general"

export function parsedTimeStampToDate(timeStamp: string): string{
    try {
        return new Date(timeStamp).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
    } catch (error) {
        return `Invalid date input: ${(error as Error).message}`
    }
}

export function parsedTimeStampToDateTime(timeStamp: string) {
    try {
        return new Date(timeStamp).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    } catch (error) {
        return `Invalid date input: ${(error as Error).message}`
    }
}

export function getOption(optionSources: Option[], value: string): Option{
    return optionSources.find(o => o.value === value) || { name: "", value: ""} // return default
}