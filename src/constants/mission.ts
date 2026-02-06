import { Option } from "@/types/general";
import { LucideIcon, NotebookText, Route } from "lucide-react";

export enum ListMissionsViewMode {
    Table,
    Kanban
}

export enum MissionCategory {
    RoutePlanning = "RoutePlanning",
    Normal = "Normal",
}

export enum MissionStatus {
    Active = "Active",
    Inactive = "Inactive",
    Finished = "Finished",
    Failed = "Failed",
    Processing = "Processing"
}

export enum MissionRole {
    Leader = "Leader",
    Member = "Member",
    CoLeader = "CoLeader"
}

export const MISSION_ROLES_OPTIONS: Option[] = [
    { name: "Leader", value: MissionRole.Leader },
    { name: "Co Leader", value: MissionRole.CoLeader },
    { name: "Member", value: MissionRole.Member },
]

export const MISSION_CATEGORIES_OPTIONS: Option[] = [
    { name: "Route Planning", value: MissionCategory.RoutePlanning.toString() },
    { name: "Normal", value: MissionCategory.Normal.toString() }
]

export const CATEGORY_ICON: { [key in MissionCategory]: LucideIcon; } = {
    [MissionCategory.RoutePlanning]: Route,
    [MissionCategory.Normal]: NotebookText

}