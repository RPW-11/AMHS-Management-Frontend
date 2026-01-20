import { MissionCategory, MissionRole, MissionStatus } from "@/constants/mission"
import { RoutePlanningAlgorithm } from "@/constants/tool-case"

export type MissionDetail = {
    id: string
    name: string
    description: string
    category: MissionCategory
    status: MissionStatus
    leader: AssignedEmployee
    finishedAt: string
    resourceLink?: string
    createdAt: string
    updatedAt: string
    numberOfMembers: number
    routePlanningSummary?: RoutePlanningSummary
}

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

export type AssignedEmployee = {
    id: string,
    firstName: string,
    lastName: string,
    imgUrl?: string,
    role: MissionRole
}

export type RoutePlanningSummary = {
    algorithm: RoutePlanningAlgorithm,
    imageUrls: string[],
    rgvMap: {
        rowDim: number,
        colDim: number,
        widthLength: number,
        heightLength: number
    }
    score: {
        throughput: number,
        trackLength: number,
        numOfRgvs: number
    }
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

export interface AddMissionResponse {
    id: string
}

export interface UpdateMissionRequest {
    name: string,
    description: string,
    status: string
}

export interface ChangeMemberRoleRequest {
    role: MissionRole
}