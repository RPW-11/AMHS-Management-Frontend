export type RgvPathPoint = {
    name: string
    type: "OBS" | "ST" | string
    time: number
    position: [number, number]
}