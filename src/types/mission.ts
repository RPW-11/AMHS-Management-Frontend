import { MissionCategory, MissionStatus } from "@/constants/mission"

export type Mission = {
    id: string
    name: string
    description: string
    category: MissionCategory
    status: MissionStatus
    finishedAt: string
    resourceLink?: string
    createdAt: string
    updatedAt: string
}

export interface AddMissionForm {
    name: string
    description: string
    category: MissionCategory
    dueDate: Date
    dueTime: string
}

export interface ErrorMissionForm {
    name: string
    category: string
    dueDateTime: string
}

export interface AddMissionRequest {
    name: string
    category: string
    description: string
    finishedAt: Date
}