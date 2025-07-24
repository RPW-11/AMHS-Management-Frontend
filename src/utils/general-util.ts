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