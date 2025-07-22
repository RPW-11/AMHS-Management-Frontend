import { Option } from "@/types/general";
import { RgvPathPlan } from "@/types/toolcase";

export const POINT_CATEGORY_OPTIONS: Option[] = [
    { name: "Obstacle", value: "OBS" },
    { name: "Station", value: "ST" }
]

export const POINT_TYPE_STYLE = new Map<string, string>([
    ["OBS", "bg-yellow-700/40 hover:bg-yellow-700/60"],
    ["ST", "bg-sky-700/40 hover:bg-sky-700/60"],
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
    image: "",
    rowDim: 20,
    colDim: 20,
    algorithm: "",
    stationsOrder: [],
    points: []
}