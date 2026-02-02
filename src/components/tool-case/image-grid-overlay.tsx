"use client";
import { useState, useRef, useEffect } from "react";
import {
    RgvPathPlan,
    RgvPathPoint,
    RouteFlow,
    SampleSolution,
} from "../../types/toolcase";
import { MapPinCheckInside } from "lucide-react";
import {
    LabellingMode,
    POINT_TYPE_STYLE,
    PointCategory,
} from "@/constants/tool-case";
import { useDebouncedCallback } from "use-debounce";
import StationFlow from "./station-flow";
import EditPointDialog from "./edit-point-dialog";
import { useAutoLabelMap } from "@/hooks/tool-case/useAutoLabelMap";
import { toast } from "sonner";
import ModeToggle from "./mode-toggle";
import Image from "next/image";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface ImageGridOverlayProps {
    rgvPathPlan: RgvPathPlan
    onChangePlan: (plan: RgvPathPlan) => void;
}

const ImageGridOverlay = ({
    rgvPathPlan,
    onChangePlan,
}: ImageGridOverlayProps) => {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const [pointsMap, setPointsMap] = useState<Map<string, RgvPathPoint>>(() => {
    const initialMap = new Map<string, RgvPathPoint>();
        for (const point of rgvPathPlan.points ?? []) {
            const key = `${point.position.rowPos}-${point.position.colPos}`;
            initialMap.set(key, point);
        }
        return initialMap;
    });
    const [routeFlows, setRouteFlows] = useState(rgvPathPlan.routeFlows ?? []);
    const [sampleSolution, setSampleSolution] = useState<SampleSolution>(
        new SampleSolution()
    );
    const [currEdited, setCurrEdited] = useState<RgvPathPoint | null>(null);
    const [mode, setMode] = useState<LabellingMode>(LabellingMode.Add);
    const [mapImgUrl, setMapImgUrl] = useState<string>("")

    const [isRgvMounted, setIsRgvMounted] = useState<boolean>(false);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    const [rowDim, colDim] = [
        rgvPathPlan.rowDim,
        rgvPathPlan.colDim,
    ];

    // Automated labelling
    const { analyzeGrid } = useAutoLabelMap();

    const handleAddRouteFlow = (idx: number, routeFlow: RouteFlow) => {
        setRouteFlows(routeFlows.map((curr, i) => (
            i === idx ? routeFlow : curr
        )))
    }

    const handleDeleteRouteFlow = (idx: number) => setRouteFlows(routeFlows.filter((_curr, i) => i !== idx))

    const handleAutomatedLabelling = async () => {
        const result = await analyzeGrid(
            mapImgUrl,
            rgvPathPlan.rowDim,
            rgvPathPlan.colDim
        );

        for (let row = 0; row < rowDim; row++) {
            for (let col = 0; col < colDim; col++) {
                if (result.gridData[row][col]) {
                    labelPath(row, col);
                }
            }
        }
    };

    const debouncedOnChangePlan = useDebouncedCallback(
        (routeFlows: RouteFlow[], pointsMap: Map<string, RgvPathPoint>) => {
        onChangePlan({
            ...rgvPathPlan,
            routeFlows: routeFlows,
            points: Array.from(pointsMap.values()),
        });
    }, 400);

    const labelPath = (rowPos: number, colPos: number) => {
        const strPoint = `${rowPos}-${colPos}`;
        const rgvPoint: RgvPathPoint = {
            name: "Obstacle",
            category: PointCategory.Obstacle,
            time: 0,
            position: { rowPos, colPos },
        };

        setPointsMap((prev) => {
            const newMap = new Map<string, RgvPathPoint>(prev);
            newMap.set(strPoint, rgvPoint);
            return newMap;
        });
    };

    const solvePath = (rowPos: number, colPos: number) => {
        const strPoint = `${rowPos}-${colPos}`;
        const exist = pointsMap.get(strPoint);

        if (exist && exist.category === PointCategory.Obstacle) {
            return;
        }

        const newSampleSolution = new SampleSolution(
            sampleSolution.pathsSet,
            sampleSolution.paths
        );

        try {
            if (
                newSampleSolution.paths.length > 0 &&
                newSampleSolution.paths[0].rowPos === rowPos &&
                newSampleSolution.paths[0].colPos === colPos
            ) {
                newSampleSolution.addPath({ rowPos, colPos });
                // reaching terminal condition, add the solution
                onChangePlan({
                    ...rgvPathPlan,
                    sampleSolutions: [
                        ...rgvPathPlan.sampleSolutions,
                        newSampleSolution.paths,
                    ],
                });
                setSampleSolution(new SampleSolution());
                // remove the paths
                setPointsMap((prev) => {
                    const newMap = new Map<string, RgvPathPoint>(prev);
                    newSampleSolution.paths.forEach((pos) => {
                        const point = newMap.get(`${pos.rowPos}-${pos.colPos}`);
                        if (point && point.category === PointCategory.Path)
                            newMap.delete(`${pos.rowPos}-${pos.colPos}`);
                    });
                    return newMap;
                });
                return;
            }

            newSampleSolution.addPath({ rowPos, colPos });
            setSampleSolution(newSampleSolution);

            let rgvPoint: RgvPathPoint = {
                name: "Path",
                category: PointCategory.Path,
                time: 0,
                position: { rowPos, colPos },
            };

            if (
                exist?.category === PointCategory.Station ||
                exist?.category === PointCategory.StationAsPath
            ) {
                rgvPoint = exist;
                rgvPoint.category = PointCategory.StationAsPath;
            }

            setPointsMap((prev) => {
                const newMap = new Map<string, RgvPathPoint>(prev);
                newMap.set(strPoint, rgvPoint);
                return newMap;
            });
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const removePoint = (rowPos: number, colPos: number) => {
        if (
            routeFlows.some(
                (routeFlow) => routeFlow.stationsOrder.some (
                    (station) => station.rowPos === rowPos && station.colPos === colPos
                )
            )
        ) {
            setRouteFlows([]);
        }

        setPointsMap((prev) => {
            const newMap = new Map<string, RgvPathPoint>(prev);
            newMap.delete(`${rowPos}-${colPos}`);
            return newMap;
        });

        // reset sample solution.
        setSampleSolution(new SampleSolution());
    };

    const editPoint = (rowPos: number, colPos: number) => {
        const point = pointsMap.get(`${rowPos}-${colPos}`);

        if (point) {
            return setCurrEdited(point);
        }

        const newPoint: RgvPathPoint = {
            name: "",
            category: PointCategory.None,
            time: 0,
            position: { rowPos, colPos },
        };

        setPointsMap((prev) => {
            const newMap = new Map<string, RgvPathPoint>(prev);
            newMap.set(`${rowPos}-${colPos}`, newPoint);
            return newMap;
        });

        setCurrEdited(newPoint);
    };

    const getPointStyle = (rowPos: number, colPos: number): string => {
        const point = pointsMap.get(`${rowPos}-${colPos}`);
        if (point && point.category !== PointCategory.None) {
            return POINT_TYPE_STYLE.get(point.category) || "";
        }
        return "hover:bg-yellow-500/40";
    };

    const handleSaveEditedPoint = (point: RgvPathPoint | null) => {
        if (point) {
            setPointsMap((prev) => {
                const newMap = new Map<string, RgvPathPoint>(prev);
                const { rowPos, colPos } = point.position;
                newMap.set(`${rowPos}-${colPos}`, point);

                return newMap;
            });
            
            const isExist = routeFlows.some(
                (routeFlow) =>
                    routeFlow.stationsOrder.some (
                        (station) => station.rowPos === point.position.rowPos 
                        && station.colPos === point.position.colPos
                    )
            )
            if (isExist
                 &&
                point.category === PointCategory.Obstacle
            ) {
                setRouteFlows([]);
            }
        }
        setCurrEdited(null);
    };

    const handleResetMap = () => {
        setPointsMap(new Map<string, RgvPathPoint>());
        setRouteFlows([]);
        setCurrEdited(null);
        setSampleSolution(new SampleSolution());
    };

    const handleMouseDown = (row: number, col: number) => {
        setIsDrawing(true);
        if (mode === LabellingMode.Edit) {
            editPoint(row, col);
        } else if (mode === LabellingMode.Add) {
            labelPath(row, col);
        } else if (mode === LabellingMode.Solve) {
            solvePath(row, col);
        } else {
            removePoint(row, col);
        }
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (isDrawing) {
            if (mode === LabellingMode.Add) {
                labelPath(row, col);
            } else if (mode === LabellingMode.Solve) {
                solvePath(row, col);
            } else {
                removePoint(row, col);
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

        if (rgvPathPlan.image) {
            setMapImgUrl(URL.createObjectURL(rgvPathPlan.image));
        }

        updateSize();
        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, [rgvPathPlan.image, rowDim, colDim]);

    useEffect(() => {
        setIsRgvMounted(true);
    }, []);

    useEffect(() => {
        if (isRgvMounted) {
            debouncedOnChangePlan(routeFlows, pointsMap);
        }
    }, [routeFlows, pointsMap, isRgvMounted, debouncedOnChangePlan]);

    const cellSize = containerSize.width / colDim;

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <Label>Define station flow</Label>
                <div className="space-y-2">
                    {routeFlows.map((routeFlow, i) => (
                        <StationFlow
                            key={i}
                            routeFlow={routeFlow}
                            pointsMap={pointsMap}
                            onChangeRouteFlow={(routeFlow) => handleAddRouteFlow(i, routeFlow)}
                            onDelete={() => handleDeleteRouteFlow(i)}
                        />
                    ))}
                </div>
                <div className="rounded-lg bg-white px-8 py-4 flex justify-center items-center border border-dashed">
                    <Button onClick={() => setRouteFlows([...routeFlows, { stationsOrder: [], arrowColor: "#000000" }])}>
                        Add Flow
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                    {`Inorder to add a flow, you need to have at least one station
                    with a type of "Station"`}
                </p>
            </div>
            <ModeToggle
                mode={mode}
                onChangeMode={setMode}
                handleResetMap={handleResetMap}
                handleAutomatedLabelling={handleAutomatedLabelling}
            />
            <div className="max-w-5xl w-full mx-auto">
                <div
                    className="relative border black rounded-md overflow-hidden bg-gray-100"
                    ref={containerRef}
                    style={{
                        height: `${containerSize.height}px`,
                    }}
                >
                    {mapImgUrl && <Image
                        fill={true}
                        src={mapImgUrl}
                        alt="Grid preview"
                        className="w-full h-full object-fill"
                        style={{
                            display: "block",
                            objectPosition: "center center",
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

                    <div
                        className="absolute top-0 left-0 w-full h-full"
                        onMouseLeave={handleMouseUp}
                    >
                        {Array.from({ length: rowDim * colDim }).map(
                            (_, index) => {
                                const row = Math.floor(index / colDim);
                                const col = index % colDim;
                                return (
                                    <button
                                        key={index}
                                        className={`cursor-pointer absolute flex items-center justify-center text-white ${getPointStyle(
                                            row,
                                            col
                                        )}`}
                                        style={{
                                            width: `${cellSize}px`,
                                            height: `${cellSize}px`,
                                            left: `${col * cellSize}px`,
                                            top: `${row * cellSize}px`,
                                        }}
                                        onMouseDown={() =>
                                            handleMouseDown(row, col)
                                        }
                                        onMouseEnter={() =>
                                            handleMouseEnter(row, col)
                                        }
                                        onMouseUp={handleMouseUp}
                                    >
                                        {(pointsMap.get(`${row}-${col}`)
                                            ?.category ===
                                            PointCategory.Station ||
                                            pointsMap.get(`${row}-${col}`)
                                                ?.category ===
                                                PointCategory.StationAsPath) && (
                                            <div>
                                                {rowDim < 10 ? (
                                                    pointsMap.get(
                                                        `${row}-${col}`
                                                    )?.name
                                                ) : (
                                                    <MapPinCheckInside className="text-primary" />
                                                )}
                                            </div>
                                        )}
                                    </button>
                                );
                            }
                        )}
                    </div>
                </div>
            </div>
            {currEdited && (
                <EditPointDialog
                    currPoint={currEdited}
                    onEdit={handleSaveEditedPoint}
                />
            )}
        </div>
    );
};

export default ImageGridOverlay;
