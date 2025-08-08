"use client"
import { useState, useRef, useEffect } from 'react';
import { Position, RgvPathPlan, RgvPathPoint, SampleSolution } from '../../types/toolcase';
import { Button } from '../ui/button';
import { ArrowBigUp, Eraser, MapPinCheckInside, Plus, RotateCcw, SquarePen, Workflow } from 'lucide-react';
import { Label } from '../ui/label';
import { LabellingMode, POINT_TYPE_STYLE, PointCategory } from '@/constants/tool-case';
import { Separator } from '../ui/separator';
import { useDebouncedCallback } from 'use-debounce';
import StationFlow from './station-flow';
import EditPointDialog from './edit-point-dialog';
import { useAutoLabelMap } from '@/hooks/tool-case/useAutoLabelMap';
import { toast } from 'sonner';

interface ImageGridOverlayProps {
    rgvPathPlan: RgvPathPlan & { image: File };
    onChangePlan: (plan: RgvPathPlan) => void
}

const ImageGridOverlay = ({
    rgvPathPlan,
    onChangePlan
}: ImageGridOverlayProps) => {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const [pointsMap, setPointsMap] = useState<Map<string, RgvPathPoint>>(new Map<string,RgvPathPoint>())
    const [stationsOrder, setStationsOrder] = useState<Position[]>([])
    const [sampleSolution, setSampleSolution] = useState<SampleSolution>(new SampleSolution())
    const [currEdited, setCurrEdited] = useState<RgvPathPoint|null>(null)
    const [mode, setMode] = useState<LabellingMode>(LabellingMode.Add)

    const [isRgvMounted, setIsRgvMounted] = useState<boolean>(false)
    const [isDrawing, setIsDrawing] = useState<boolean>(false)

    const [rowDim, colDim, image] = [rgvPathPlan.rowDim, rgvPathPlan.colDim, rgvPathPlan.image]
    const [imageUrl, setImageUrl] = useState<string|null>(null)

    // Automated labelling
    const { analyzeGrid, loading, error } = useAutoLabelMap()

    const handleAutomatedLabelling = async () => {
        const result = await analyzeGrid(URL.createObjectURL(rgvPathPlan.image), rgvPathPlan.rowDim, rgvPathPlan.colDim); 
        
        for (let row = 0; row < rowDim; row++) {
            for (let col = 0; col < colDim; col++) {
                if (result.gridData[row][col]){
                    labelPath(row, col)
                }
            }
        }
    }

    const debouncedOnChangePlan = useDebouncedCallback(() => {
        onChangePlan({...rgvPathPlan, stationsOrder: stationsOrder, points: Array.from(pointsMap.values()), sampleSolution: sampleSolution.paths})
    }, 400)

    const labelPath = (rowPos: number, colPos: number) => {
        const strPoint = `${rowPos}-${colPos}`
        const rgvPoint: RgvPathPoint = {
            name: "Obstacle",
            category: PointCategory.Obstacle,
            time: 0,
            position: { rowPos, colPos }
        }

        setPointsMap(prev => {
            const newMap = new Map<string, RgvPathPoint>(prev)
            newMap.set(strPoint, rgvPoint)
            return newMap
        })
    }

    const solvePath = (rowPos: number, colPos: number) => {
        const strPoint = `${rowPos}-${colPos}`
        const exist = pointsMap.get(strPoint)

        if(exist && exist.category === PointCategory.Obstacle) {
            return
        }


        const newSampleSolution = new SampleSolution(sampleSolution.pathsSet, sampleSolution.paths)
        try {
            newSampleSolution.addPath({ rowPos, colPos })
            setSampleSolution(newSampleSolution)

            let rgvPoint: RgvPathPoint = {
                name: "Path",
                category: PointCategory.Path,
                time: 0,
                position: { rowPos, colPos }
            }

            if (exist?.category === PointCategory.Station) {
                rgvPoint = exist
                rgvPoint.category = PointCategory.StationAsPath
            }

            setPointsMap(prev => {
                const newMap = new Map<string, RgvPathPoint>(prev)
                newMap.set(strPoint, rgvPoint)
                return newMap
            })

        } catch (error) {
            toast.error((error as Error).message)
        }
    }

    const removePoint = (rowPos: number, colPos: number) => {
        if (stationsOrder.some(station => station.rowPos === rowPos && station.colPos === colPos)) {
            setStationsOrder([])
        }

        setPointsMap(prev => {
            const newMap = new Map<string, RgvPathPoint>(prev)
            newMap.delete(`${rowPos}-${colPos}`)
            return newMap
        })

        // reset sample solution.
        setSampleSolution(new SampleSolution())
    }

    const editPoint = (rowPos: number, colPos: number) => {
        const point = pointsMap.get(`${rowPos}-${colPos}`)

        if (point) {
            return setCurrEdited(point)
        }
        
        const newPoint:RgvPathPoint = {
            name: "",
            category: PointCategory.None,
            time: 0,
            position: { rowPos, colPos }
        }

        setPointsMap(prev => {
            const newMap = new Map<string, RgvPathPoint>(prev)
            newMap.set(`${rowPos}-${colPos}`, newPoint)
            return newMap
        })

        setCurrEdited(newPoint)
    }

    const getPointStyle = (rowPos: number, colPos: number): string => {
        const point = pointsMap.get(`${rowPos}-${colPos}`)
        if (point && point.category !== PointCategory.None) {
            return POINT_TYPE_STYLE.get(point.category) || ""
        }
        return "hover:bg-yellow-500/40"
    }

    const handleSaveEditedPoint = (point: RgvPathPoint | null) => {
        if (point) {
            setPointsMap(prev => {
                const newMap = new Map<string, RgvPathPoint>(prev)
                const { rowPos, colPos } = point.position
                newMap.set(`${rowPos}-${colPos}`, point)

                return newMap
            })

            if (stationsOrder.some(station => station.rowPos === point.position.rowPos && station.colPos === point.position.colPos) && point.category === PointCategory.Obstacle) {
                setStationsOrder([])
            }
        }
        setCurrEdited(null)
    }

    const handleResetMap = () => {
        setPointsMap(new Map<string, RgvPathPoint>())
        setStationsOrder([])
        setCurrEdited(null)
        setSampleSolution(new SampleSolution())
    }

    const handleMouseDown = (row: number, col: number) => {
        setIsDrawing(true);
        if (mode === LabellingMode.Edit) {
            editPoint(row, col)
        } else if (mode === LabellingMode.Add) {
            labelPath(row, col);
        } else if (mode === LabellingMode.Solve) {
            solvePath(row, col);
        }  else {
            removePoint(row, col)
        }
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (isDrawing) {
            if (mode === LabellingMode.Add) {
                labelPath(row, col);
            } else if(mode === LabellingMode.Solve) {
                solvePath(row, col)
            } else {
                removePoint(row, col)
            }
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

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

        if(image) {
            setImageUrl(URL.createObjectURL(image))
        }

        updateSize();
        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);
    }, [image, rowDim, colDim]);

    useEffect(() => {
        for(const point of rgvPathPlan.points) {
            setPointsMap(prev => {
                const newMap = new Map<string, RgvPathPoint>(prev)
                newMap.delete(`${point.position.rowPos}-${point.position.colPos}`)
                return newMap
            })
        }
        setStationsOrder(rgvPathPlan.stationsOrder)
        setIsRgvMounted(true)
    }, [])

    useEffect(() => {
        if (isRgvMounted) {
            debouncedOnChangePlan()
        }
    }, [stationsOrder, pointsMap])

    const cellSize = containerSize.width / colDim;

    return (
        <div className="space-y-4">
            <StationFlow 
            stationsOrder={stationsOrder}
            pointsMap={pointsMap}
            onChangeStationsOrder={setStationsOrder}
            />
            <div className="space-y-2">
                <Label>Map tools</Label>
                <div className="flex gap-2">
                    <Button size={"icon"}
                    title='Erase tile'
                    onClick={() => setMode(LabellingMode.Delete)} 
                    variant={mode === LabellingMode.Delete ? "secondary" : "outline"}>
                        <Eraser/>
                    </Button>
                    <Button size={"icon"}
                    title='Add obstacle' 
                    onClick={() => setMode(LabellingMode.Add)} 
                    variant={mode === LabellingMode.Add ? "secondary" : "outline"}>
                        <Plus/>
                    </Button>
                    <Button size={"icon"}
                    title='Edit tile' 
                    onClick={() => setMode(LabellingMode.Edit)} 
                    variant={mode === LabellingMode.Edit ? "secondary" : "outline"}>
                        <SquarePen/>
                    </Button>
                    <Button size={"icon"}
                    title='Add solution path' 
                    onClick={() => setMode(LabellingMode.Solve)} 
                    variant={mode === LabellingMode.Solve ? "secondary" : "outline"}>
                        <ArrowBigUp/>
                    </Button>
                    <Separator orientation='vertical' className='h-5'/>
                    <Button size={"icon"}
                    title='Reset map' 
                    onClick={handleResetMap} 
                    variant={"outline"}>
                        <RotateCcw/>
                    </Button>
                    <Button size={"icon"}
                    title='Automated labelling' 
                    onClick={handleAutomatedLabelling} 
                    variant={"outline"}>
                        <Workflow/>
                    </Button>
                </div>
            </div>
            <div className="max-w-3xl w-full mx-auto">
                <div 
                    className="relative border black rounded-md overflow-hidden bg-gray-100" 
                    ref={containerRef}
                    style={{
                        height: `${containerSize.height}px`
                    }}
                >
                    {imageUrl && <img
                        src={imageUrl}
                        alt="Grid preview"
                        className="w-full h-full object-fill"
                        style={{
                            display: 'block',
                            objectPosition: 'center center'
                        }}
                    />}

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

                    <div className="absolute top-0 left-0 w-full h-full" onMouseLeave={handleMouseUp}>
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
                                    onMouseDown={() => handleMouseDown(row, col)}
                                    onMouseEnter={() => handleMouseEnter(row, col)}
                                    onMouseUp={handleMouseUp}
                                >
                                    { 
                                    (pointsMap.get(`${row}-${col}`)?.category === PointCategory.Station 
                                    ||
                                    pointsMap.get(`${row}-${col}`)?.category === PointCategory.StationAsPath)
                                    && 
                                        <div>
                                            {rowDim < 10 ? pointsMap.get(`${row}-${col}`)?.name : <MapPinCheckInside className='text-primary'/>}
                                        </div>
                                    }
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

export default ImageGridOverlay;