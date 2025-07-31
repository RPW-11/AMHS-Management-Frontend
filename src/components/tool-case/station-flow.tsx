import { MoveRight, X } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Position, RgvPathPoint } from "@/types/toolcase";

interface StationFlowProps {
    stationsOrder: Position[]
    pointsMap: Map<string, RgvPathPoint>,
    onChangeStationsOrder: (stationsOrder: Position[]) => void
}

const StationFlow = ({
    stationsOrder,
    pointsMap,
    onChangeStationsOrder
}: StationFlowProps) => {
    const hasStation = ():boolean => Array.from(pointsMap.values()).some(station => station.category === "ST")
    const handleAddStation = (station: RgvPathPoint) => onChangeStationsOrder([...stationsOrder, station.position])
    const handleRemoveStation = (idx: number) => onChangeStationsOrder(stationsOrder.filter((_stat, i) => i !== idx))
    
    return (
        <div className="space-y-2">
            <Label>Define station flow</Label>
            <div className="flex flex-wrap gap-2 rounded-md p-4 bg-gray-100">
                {stationsOrder.map((station, i) => (
                    <div className='flex items-center gap-2 text-primary' key={i}>
                        <Button 
                        variant={"outline"} 
                        size={"sm"} 
                        className="group transition-all duration-200 w-16" 
                        title={pointsMap.get(`${station.rowPos}-${station.colPos}`)?.name || ""}
                        onClick={() => handleRemoveStation(i)}>
                            <span className="block group-hover:hidden truncate">
                                {pointsMap.get(`${station.rowPos}-${station.colPos}`)?.name || ""}
                            </span>
                            <X className="hidden group-hover:block text-red-700"/>
                        </Button>
                        {i !== stationsOrder.length-1 && <MoveRight/>}
                    </div>
                ))
                }
                {stationsOrder.length > 0 && <div><Separator orientation="vertical" className='mx-2 bg-gray-400'/></div>}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"default"} disabled={!hasStation()}>Add</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Stations</DropdownMenuLabel>
                        <DropdownMenuGroup>
                        {Array.from(pointsMap.values()).map((station, i) => station.category === "ST" && (
                            <DropdownMenuItem key={i} onClick={() => handleAddStation(station)}>
                                { station.name }
                            </DropdownMenuItem>
                        ))}
                        </DropdownMenuGroup>  
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <p className="text-xs text-muted-foreground">Inorder to add a flow, you need to have at least one station with a type of "Station"</p>
        </div>
    )
}

export default StationFlow;