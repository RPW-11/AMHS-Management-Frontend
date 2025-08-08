import { Option } from "@/types/general";
import { RgvPathPlan } from "@/types/toolcase";

export enum PointCategory {
    Obstacle = "OBS",
    Station = "ST",
    None = "NONE",
    Path = "PATH",
    StationAsPath = "STATION_AS_PATH"
}

export enum LabellingMode {
    Add,
    Edit,
    Delete,
    Solve
}

export const POINT_CATEGORY_OPTIONS: Option[] = [
    { name: "Obstacle", value: PointCategory.Obstacle.toString() },
    { name: "Station", value: PointCategory.Station.toString() }
]

export const POINT_TYPE_STYLE = new Map<string, string>([
    [PointCategory.Obstacle.toString(), "bg-yellow-700/40 hover:bg-yellow-700/60"],
    [PointCategory.Station.toString(), "bg-sky-700/40 hover:bg-sky-700/60"],
    [PointCategory.Path.toString(), "bg-green-700/40 hover:bg-green-700/60"],
    [PointCategory.StationAsPath.toString(), "bg-green-700/40 hover:bg-green-700/60"]
])

export const ROUTE_PLANNING_ALGORITHMS = [
    {
        name: "Depth-First Search (DFS)",
        description: "Find all possible routes and grab the best result. Not suitable for high-dimensional matrix (optimal at 6x6)"
    },
    {
        name: "Genetic Algorithm (GA)",
        description: "Find optimal route based on chromosome crossover. Quite optimal for mid-sized matrix"
    },
    {
        name: "Reinforcement Learning PPO",
        description: "Optimal for large matrix"
    },
]

export const DEFAULT_RGV_PLAN: RgvPathPlan = {
    id: "",
    image: null,
    rowDim: 20,
    colDim: 20,
    algorithm: "",
    stationsOrder: [],
    sampleSolution: [],
    points: []
}