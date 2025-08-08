import { Option } from "@/types/general";

export enum MissionCategory {
    RoutePlanning = "RoutePlanning",
    Normal = "Normal",
}

export enum MissionStatus {
    Active,
    Inactive,
    Finished
}

export const MISSION_CATEGORIES_OPTIONS: Option[] = [
    { name: "Route Planning", value: MissionCategory.RoutePlanning.toString() },
    { name: "Normal", value: MissionCategory.Normal.toString() }
]