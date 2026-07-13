import { PointCategory, RoutePlanningAlgorithm } from "@/constants/tool-case";
import { Option } from "@/types/general";
import { TFunction } from "i18next";

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

export const getTranslatedPointCategoryOptions = (t: TFunction): Option[] => [
    { name: t("toolCase.rgvRoutePlanning.pointCategory.obstacle"), value: PointCategory.Obstacle.toString() },
    { name: t("toolCase.rgvRoutePlanning.pointCategory.station"), value: PointCategory.Station.toString() }
]

export const getTranslatedRoutePlanningAlgorithms = (t: TFunction) => [
    {
        name: t("toolCase.algorithms.geneticAlgorithm.name"),
        description: t("toolCase.algorithms.geneticAlgorithm.description"),
        value: RoutePlanningAlgorithm.GeneticAlgorithm
    },
]