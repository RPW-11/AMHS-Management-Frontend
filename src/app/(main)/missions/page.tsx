"use client"
import { Button } from "@/components/ui/button"
import { MissionRoutes } from "@/constants/general";
import { ListMissionsViewMode } from "@/constants/mission";
import { CircleX, Kanban, Table } from "lucide-react";
import { useRouter } from "next/navigation"
import { useState } from "react";
import KanbanView from "./kanban-view";
import { useLoadMission } from "@/hooks/mission/useLoadMission";
import LoadingSpinner from "@/components/loading-spinner";
import TableView from "./table-view";


const MissionPage = () => {
    const [viewMode, setViewMode] = useState<ListMissionsViewMode>(ListMissionsViewMode.Table);
    const { missions, isFetchingMissions, error } = useLoadMission();
    const { push } = useRouter()

    if (isFetchingMissions) {
        return(
            <div className="w-full h-full flex justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (error) {
        return (
             <div className="w-full h-full flex flex-col items-center justify-center text-center gap-2">
                <CircleX size={32} className="text-red-500"/>
                <div className="text-xl text-red-500">Error fetching the data</div>
            </div>
        )
    }

    return (
        <div className="rounded-md p-4 bg-white border space-y-6">
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button onClick={() => setViewMode(ListMissionsViewMode.Table)} size={"sm"} className="font-medium" variant={viewMode === ListMissionsViewMode.Table ? "secondary" : "ghost"}>
                        <Table/>
                        Table
                    </Button>
                    <Button onClick={() => setViewMode(ListMissionsViewMode.Kanban)} size={"sm"} className="font-medium" variant={viewMode === ListMissionsViewMode.Kanban ? "secondary" : "ghost"}>
                        <Kanban/>
                        Kanban
                    </Button>
                </div>
                <Button onClick={() => push(MissionRoutes.Add)}>Add mission</Button>
            </div>
            <div className="w-full">
                {viewMode === ListMissionsViewMode.Kanban ? 
                <KanbanView missions={missions} />
                :
                <TableView missions={missions} />
                }
            </div>
        </div>
    )
}

export default MissionPage