export type RgvPathPoint = {
    name: string
    type: "OBS" | "ST" | string
    time: number
    position: [number, number]
}

export type RgvPathPlan = {
    id:string
    image: string
    rowDim: number
    colDim: number
    algorithm: string
    stationsOrder: [rowPos: number, colPos: number][]
    points: RgvPathPoint[]
}

export interface RgvPathPlanReq {
    id?:string
    image: string
    rowDim: number
    colDim: number
    algorithm: string
    stationsOrder: [rowPos: number, colPos: number][]
    points: RgvPathPoint[]
}