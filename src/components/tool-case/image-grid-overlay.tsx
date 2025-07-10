"use client"
import { useState, useRef, useEffect } from 'react';
import { RgvPathPoint } from '../../types/toolcase';
import { Button } from '../ui/button';
import { Ban, Eraser, MoveRight, Plus, SquarePen, Trash, X } from 'lucide-react';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import SelectOption from '../select-option';
import { POINT_CATEGORY_OPTIONS, POINT_TYPE_STYLE } from '@/constants/tool-case';
import { Option } from '@/types/general';
import { Input } from '../ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';

interface ImageGridOverlayProps {
    image: string
    rowDim: number
    colDim: number
}

const ImageGridOverlay = ({
    image,
    rowDim,
    colDim
}: ImageGridOverlayProps) => {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const [pointsMap, setPointsMap] = useState<Map<string, RgvPathPoint>>(new Map<string,RgvPathPoint>())
    const [stationsOrder, setStationsOrder] = useState<[number, number][]>([])
    const [currEdited, setCurrEdited] = useState<RgvPathPoint|null>(null)
    const [mode, setMode] = useState<string>("ADD")

    const labelPath = (rowPos: number, colPos: number) => {
        const strPoint = `${rowPos}${colPos}`
        const rgvPoint: RgvPathPoint = {
            name: "Obstacle",
            type: "OBS",
            time: 0,
            position: [rowPos, colPos]
        }

        setPointsMap(prev => {
            const newMap = new Map<string, RgvPathPoint>(prev)
            newMap.set(strPoint, rgvPoint)
            return newMap
        })
    }

    const removePoint = (rowPos: number, colPos: number) => {
        if (stationsOrder.some(station => station[0] === rowPos && station[1] === colPos)) {
            setStationsOrder([])
        }

        setPointsMap(prev => {
            const newMap = new Map<string, RgvPathPoint>(prev)
            newMap.delete(`${rowPos}${colPos}`)
            return newMap
        })
    }

    const editPoint = (rowPos: number, colPos: number) => {
        const point = pointsMap.get(`${rowPos}${colPos}`)

        if (point) {
            return setCurrEdited(point)
        }
        
        const newPoint:RgvPathPoint = {
            name: "",
            type: "",
            time: 0,
            position: [rowPos, colPos]
        }

        setPointsMap(prev => {
            const newMap = new Map<string, RgvPathPoint>(prev)
            newMap.set(`${rowPos}${colPos}`, newPoint)
            return newMap
        })

        setCurrEdited(newPoint)
    }

    const getPointStyle = (rowPos: number, colPos: number): string => {
        const point = pointsMap.get(`${rowPos}${colPos}`)
        if (point && point.type !== "") {
            return POINT_TYPE_STYLE.get(point.type) || ""
        }
        return "hover:bg-yellow-500/40"
    }

    const hasStation = ():boolean => Array.from(pointsMap.values()).some(station => station.type === "ST")

    const handleAddStation = (station: RgvPathPoint) => setStationsOrder([...stationsOrder, station.position])

    const handleRemoveStation = (idx: number) => setStationsOrder(prev => prev.filter((_stat, i) => i !== idx))

    const handleSaveEditedPoint = (point: RgvPathPoint | null) => {
        if (point) {
            setPointsMap(prev => {
                const newMap = new Map<string, RgvPathPoint>(prev)
                const [rowPos, colPos] = point.position
                newMap.set(`${rowPos}${colPos}`, point)

                return newMap
            })

            if (stationsOrder.some(station => station[0] === point.position[0] && station[1] === point.position[1]) && point.type === "OBS") {
                setStationsOrder([])
            }
        }
        setCurrEdited(null)
    }

    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const size = containerRef.current.offsetWidth;
                setContainerSize({
                    width: size,
                    height: size * (rowDim / colDim),
                });
            }
        };

        updateSize();
        window.addEventListener('resize', updateSize);

        

        return () => window.removeEventListener('resize', updateSize);
    }, [image, rowDim, colDim]);

    const cellSize = containerSize.width / colDim;

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Define station flow</Label>
                <div className="flex flex-wrap gap-2 rounded-md p-4 bg-gray-100">
                    {stationsOrder.map((station, i) => (
                        <div className='flex items-center gap-2 text-primary' key={i}>
                            <Button 
                            variant={"outline"} 
                            size={"sm"} 
                            className="group transition-all duration-200 w-16" 
                            title={pointsMap.get(`${station[0]}${station[1]}`)?.name || ""}
                            onClick={() => handleRemoveStation(i)}>
                                <span className="block group-hover:hidden truncate">
                                    {pointsMap.get(`${station[0]}${station[1]}`)?.name || ""}
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
                            {Array.from(pointsMap.values()).map((station, i) => station.type === "ST" && (
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
            <div className="space-y-2">
                <Label>Map tools</Label>
                <div className="flex gap-2">
                    <Button size={"icon"}
                    onClick={() => setMode("DEL")} 
                    variant={mode === "DEL" ? "secondary" : "outline"}>
                        <Eraser/>
                    </Button>
                    <Button size={"icon"} 
                    onClick={() => setMode("ADD")} 
                    variant={mode === "ADD" ? "secondary" : "outline"}>
                        <Plus/>
                    </Button>
                    <Button size={"icon"} 
                    onClick={() => setMode("EDT")} 
                    variant={mode === "EDT" ? "secondary" : "outline"}>
                        <SquarePen/>
                    </Button>
                </div>
            </div>
            <div className="max-w-3xl w-full mx-auto">
                <div 
                    className="relative border rounded-md overflow-hidden bg-gray-100" 
                    ref={containerRef}
                    style={{
                        height: `${containerSize.height}px`
                    }}
                >
                    <img
                        src={image}
                        alt="Grid preview"
                        className="w-full h-full object-fill"
                        style={{
                            display: 'block',
                            objectPosition: 'center center'
                        }}
                    />

                    <div
                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, gray 1px, transparent 1px),
                                linear-gradient(to bottom, gray 1px, transparent 1px)
                            `,
                            backgroundSize: `${cellSize}px ${cellSize}px`,
                        }}
                    />

                    <div className="absolute top-0 left-0 w-full h-full">
                        {Array.from({ length: rowDim * colDim }).map((_, index) => {
                            const row = Math.floor(index / colDim);
                            const col = index % colDim;
                            return (
                                <button
                                    key={index}
                                    className={`cursor-pointer absolute flex items-center justify-center text-white ${getPointStyle(row, col)}`}
                                    style={{
                                        width: `${cellSize}px`,
                                        height: `${cellSize}px`,
                                        left: `${col * cellSize}px`,
                                        top: `${row * cellSize}px`,
                                    }}
                                    onClick={() => mode === "ADD" ? labelPath(row, col) : mode === "DEL" ? removePoint(row, col) : editPoint(row, col)}
                                >
                                    { pointsMap.get(`${row}${col}`)?.type === "OBS" ? <Ban/> : pointsMap.get(`${row}${col}`)?.name }
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            {currEdited && <EditPointDialog
            currPoint={currEdited}
            onEdit={handleSaveEditedPoint}/>}
        </div>
    );
};

interface EditPointDialogProps {
    currPoint: RgvPathPoint;
    onEdit: (newPoint: RgvPathPoint | null) => void;
}

const EditPointDialog = ({
    currPoint,
    onEdit
}: EditPointDialogProps) => {
    const [localPoint, setLocalPoint] = useState<RgvPathPoint>(currPoint)

    const formatPointToOption = (): Option => {
        return localPoint.type === "OBS" ? POINT_CATEGORY_OPTIONS[0] : localPoint.type === "ST" ? POINT_CATEGORY_OPTIONS[1] : { name: "", value: "" }
    }

    const changePointType = (value: Option) => setLocalPoint({...localPoint, type: value.value })

    const changePointName = (value: string) => setLocalPoint({...localPoint, name: value })

    const changeProcessingTime = (value: string) => setLocalPoint({...localPoint, time: Number(value)})

    const canSavePoint = () => {
        return localPoint.name !== "" && localPoint.type !== ""
    }

    const handleSavePoint = () => onEdit(localPoint)

    return (
        <Dialog open={currPoint !== null} onOpenChange={() => onEdit(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Point</DialogTitle>
                    <DialogDescription>
                        Fill the information of the point
                    </DialogDescription>
                </DialogHeader>
                <div className='grid grid-cols-2 gap-4'>
                    <div className="col-span-2 space-y-2">
                        <Label>Point Name</Label>
                        <Input value={localPoint.name} onChange={(e) => changePointName(e.target.value)} placeholder='Enter the point name'/>
                    </div>
                    <div className="col-span-2 lg:col-span-1 space-y-2">
                        <Label>Point Type</Label>
                        <SelectOption 
                        value={formatPointToOption()}
                        options={POINT_CATEGORY_OPTIONS}
                        onValueChange={changePointType}
                        labelName='Point Type'
                        placeholder='Select point type'
                        />
                    </div>
                    <div className="col-span-2 lg:col-span-1 space-y-2">
                        <Label>Processing time (s)</Label>
                        <Input value={localPoint.time} onChange={(e) => changeProcessingTime(e.target.value)} placeholder='Enter the processing time' type='number'/>
                    </div>
                    <div className="col-span-2 flex justify-end">
                        <Button onClick={handleSavePoint} disabled={!canSavePoint()}>Save</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ImageGridOverlay;