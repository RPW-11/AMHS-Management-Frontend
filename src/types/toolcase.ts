import { PointCategory } from "@/constants/tool-case"

export type Position = {
    rowPos: number
    colPos: number
}

export type RgvPathPoint = {
    name: string
    category: PointCategory
    time: number
    position: Position
}

export type RgvPathPlan = {
    id:string
    image: File | null
    rowDim: number
    colDim: number
    algorithm: string
    stationsOrder: Position[]
    points: RgvPathPoint[]
}

export interface CreateRgvPathPlanReq {
    image: File
    routeMetaData: {
        rowDim: number
        colDim: number
        algorithm: string
        stationsOrder: Position[]
        points: RgvPathPoint[]
    }
}

export interface ImageAnalysisResult {
    gridData: boolean[][];
    cellWidth: number;
    cellHeight: number;
}

export interface PixelAnalysisOptions {
    threshold?: number;
    targetColor?: { r: number; g: number; b: number };
    sampleEvery?: number;
}