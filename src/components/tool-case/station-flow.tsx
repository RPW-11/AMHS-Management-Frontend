import { MoveRight, X } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { HexColorPicker } from "react-colorful";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RgvPathPoint, RouteFlow } from "@/types/toolcase";
import { PointCategory } from "@/constants/tool-case";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";

interface StationFlowProps {
    routeFlow: RouteFlow;
    pointsMap: Map<string, RgvPathPoint>;
    onChangeRouteFlow: (routeFlow: RouteFlow) => void;
    onDelete: () => void;
}

const StationFlow = ({
    routeFlow,
    pointsMap,
    onChangeRouteFlow,
    onDelete
}: StationFlowProps) => {
    const [arrowColor, setArrowColor] = useState<string>(routeFlow.arrowColor || "#000000")
    const hasStation = (): boolean =>
        pointsMap
            .values()
            .some(
                (station) =>
                    station.category === PointCategory.Station ||
                    station.category === PointCategory.StationAsPath
            );
    const handleAddStation = (station: RgvPathPoint) =>
        onChangeRouteFlow({...routeFlow, stationsOrder: [...routeFlow.stationsOrder, station.position]});
    
    const handleRemoveStation = (idx: number) =>
        onChangeRouteFlow({...routeFlow, stationsOrder: routeFlow.stationsOrder.filter((_stat, i) => i !== idx)});

    const handleChangeArrowColor = (color: string) => {
        setArrowColor(color);
        onChangeRouteFlow({...routeFlow, arrowColor: color});
    }

    return (
        <div className="relative rounded-md p-4 bg-gray-100 space-y-4">
            <Button onClick={onDelete} size={"icon-sm"} variant={"secondary"} className="absolute w-fit h-fit p-1 -top-2 -right-2 z-10">
                <X/>
            </Button>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} size={"sm"} className="w-32 justify-start gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: arrowColor }}></div>
                        { arrowColor }
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                    <HexColorPicker color={arrowColor} onChange={handleChangeArrowColor}/>
                </PopoverContent>
            </Popover>
            <div className="flex flex-wrap gap-2">
                {routeFlow.stationsOrder.map((station, i) => (
                    <div
                        className="flex items-center gap-2 text-primary"
                        key={i}
                    >
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            className="group transition-all duration-200 w-16"
                            title={
                                pointsMap.get(
                                    `${station.rowPos}-${station.colPos}`
                                )?.name || ""
                            }
                            onClick={() => handleRemoveStation(i)}
                        >
                            <span className="block group-hover:hidden truncate">
                                {pointsMap.get(
                                    `${station.rowPos}-${station.colPos}`
                                )?.name || ""}
                            </span>
                            <X className="hidden group-hover:block text-red-700" />
                        </Button>
                        {i !== routeFlow.stationsOrder.length - 1 && <MoveRight />}
                    </div>
                ))}
                {routeFlow.stationsOrder.length > 0 && (
                    <div>
                        <Separator
                            orientation="vertical"
                            className="mx-2 bg-gray-400"
                        />
                    </div>
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"default"} size={"sm"} disabled={!hasStation()}>
                            Add
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Stations</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            {[...pointsMap.values()].map(
                                (station, i) =>
                                    (station.category ===
                                        PointCategory.Station ||
                                        station.category ===
                                            PointCategory.StationAsPath) && (
                                        <DropdownMenuItem
                                            key={i}
                                            onClick={() =>
                                                handleAddStation(station)
                                            }
                                        >
                                            {station.name}
                                        </DropdownMenuItem>
                                    )
                            )}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default StationFlow;
