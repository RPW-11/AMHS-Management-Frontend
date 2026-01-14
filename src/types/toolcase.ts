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
    widthLength: number
    heightLength: number
    algorithm: string
    stationsOrder: Position[]
    sampleSolutions: Position[][]
    points: RgvPathPoint[]
}

export interface CreateRgvPathPlanReq {
    image: File
    routeMetaData: {
        rowDim: number
        colDim: number
        widthLength: number
        heightLength: number
        algorithm: string
        stationsOrder: Position[]
        sampleSolutions: Position[][]
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

export class SampleSolution {
    public pathsSet: Set<string>;
    public paths: Position[];
    constructor(pathsSet: Set<string> = new Set<string>(), paths: Position[] = []){
        this.pathsSet = pathsSet
        this.paths = paths
    }

    public addPath (position: Position) {
        if (this.paths.length > 0) {
            const prevPoint = this.paths[this.paths.length - 1]
            // abs diff must be one
            const rowDiff = Math.abs(position.rowPos - prevPoint.rowPos)
            const colDiff = Math.abs(position.colPos - prevPoint.colPos)
            
            if ((rowDiff !== 0 && rowDiff !== 1) || (colDiff !== 1 && colDiff !== 0)){
                throw new Error("Cannot add non-connected path")
            }
            
        }
        
        if (this.pathsSet.has(`${position.rowPos}-${position.colPos}`) 
            && 
            (this.paths[0].rowPos !== position.rowPos
            || 
            this.paths[0].colPos !== position.colPos)
        )
        {
            throw new Error("Cannot add the same path")
        }

        this.paths.push(position)
        this.pathsSet.add(`${position.rowPos}-${position.colPos}`)
    }
}