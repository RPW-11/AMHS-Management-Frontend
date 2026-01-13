import { AddMissionForm, AddMissionRequest } from "@/types/mission";

export function addMissionFormToRequest(form: AddMissionForm): AddMissionRequest{
    const finishedAt = new Date(form.dueDate)
    const [hours, mins] = form.dueTime.split(':')
    finishedAt.setHours(Number(hours), Number(mins), 0)

    return {
        name: form.name,
        category: form.category,
        description: form.description,
        finishedAt: finishedAt
    }
}