import { PointCategory } from "@/constants/tool-case";

export const getPointCategoryByStr = (category: string): PointCategory => {
    switch (category.toLowerCase()) {
        case "obs":
            return PointCategory.Obstacle
        case "st":
            return PointCategory.Station
        default:
            return PointCategory.None
    }
}