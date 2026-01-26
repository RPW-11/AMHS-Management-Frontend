"use client";
import { Button } from "@/components/ui/button";
import { MissionRoutes } from "@/constants/general";
import { ListMissionsViewMode } from "@/constants/mission";
import { Kanban, Table } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import KanbanView from "./kanban-view";
import TableView from "./table-view";

const MissionPage = () => {
    const [viewMode, setViewMode] = useState<ListMissionsViewMode>(
        ListMissionsViewMode.Table,
    );
    const { push } = useRouter();

    return (
        <div className="rounded-md p-4 bg-white border space-y-6">
            <div className="flex items-center gap-2">
                <Button
                    onClick={() => setViewMode(ListMissionsViewMode.Table)}
                    size={"sm"}
                    className="font-medium"
                    variant={
                        viewMode === ListMissionsViewMode.Table
                            ? "secondary"
                            : "ghost"
                    }
                >
                    <Table />
                    Table
                </Button>
                <Button
                    onClick={() => setViewMode(ListMissionsViewMode.Kanban)}
                    size={"sm"}
                    className="font-medium"
                    variant={
                        viewMode === ListMissionsViewMode.Kanban
                            ? "secondary"
                            : "ghost"
                    }
                >
                    <Kanban />
                    Kanban
                </Button>
            </div>
            <div className="w-full">
                {viewMode === ListMissionsViewMode.Kanban ? (
                    <KanbanView missions={[]} />
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-xl font-semibold">Table View</h1>
                                <p className="text-sm text-muted-foreground">Monitor, filter, and manage active mission deployments and team assignments in real-time.</p>
                            </div>
                            <Button onClick={() => push(MissionRoutes.Add)}>
                                Add mission
                            </Button>
                        </div>
                        <TableView />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MissionPage;
