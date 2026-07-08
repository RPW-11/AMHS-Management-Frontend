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
import { Cluster, ClusterFlow } from "@/types/toolcase";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";

interface ClusterFlowEditorProps {
    clusterFlow: ClusterFlow;
    clusters: Cluster[];
    onChangeClusterFlow: (clusterFlow: ClusterFlow) => void;
    onDelete: () => void;
}

const ClusterFlowEditor = ({
    clusterFlow,
    clusters,
    onChangeClusterFlow,
    onDelete
}: ClusterFlowEditorProps) => {
    const [arrowColor, setArrowColor] = useState<string>(clusterFlow.arrowColor || "#000000")

    const handleAddCluster = (clusterIdx: number) =>
        onChangeClusterFlow({...clusterFlow, clusterOrder: [...clusterFlow.clusterOrder, clusterIdx]});

    const handleRemoveCluster = (idx: number) =>
        onChangeClusterFlow({...clusterFlow, clusterOrder: clusterFlow.clusterOrder.filter((_stat, i) => i !== idx)});

    const handleChangeArrowColor = (color: string) => {
        setArrowColor(color);
        onChangeClusterFlow({...clusterFlow, arrowColor: color});
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
                {clusterFlow.clusterOrder.map((clusterIdx, i) => (
                    <div
                        className="flex items-center gap-2 text-primary"
                        key={i}
                    >
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            className="group transition-all duration-200 w-16"
                            title={clusters[clusterIdx]?.name || ""}
                            onClick={() => handleRemoveCluster(i)}
                        >
                            <span className="block group-hover:hidden truncate">
                                {clusters[clusterIdx]?.name || ""}
                            </span>
                            <X className="hidden group-hover:block text-red-700" />
                        </Button>
                        {i !== clusterFlow.clusterOrder.length - 1 && <MoveRight />}
                    </div>
                ))}
                {clusterFlow.clusterOrder.length > 0 && (
                    <div>
                        <Separator
                            orientation="vertical"
                            className="mx-2 bg-gray-400"
                        />
                    </div>
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"default"} size={"sm"} disabled={clusters.length === 0}>
                            Add
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="start">
                        <DropdownMenuLabel>Clusters</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            {clusters.map((cluster, i) => (
                                <DropdownMenuItem
                                    key={i}
                                    onClick={() => handleAddCluster(i)}
                                >
                                    {cluster.name || `Cluster ${i + 1}`}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default ClusterFlowEditor;
