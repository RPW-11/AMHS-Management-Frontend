"use client";
import { Button } from "@/components/ui/button";
import { MissionRoutes } from "@/constants/general";
import { ListMissionsViewMode } from "@/constants/mission";
import { Kanban, Table } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import KanbanView from "./kanban-view";
import TableView from "./table-view";
import { useTranslation } from "react-i18next";

const MissionPage = () => {
    const [viewMode, setViewMode] = useState<ListMissionsViewMode>(
        ListMissionsViewMode.Table,
    );
    const { push } = useRouter();
    const { t } = useTranslation();

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
                    {t("missions.tabs.table")}
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
                    {t("missions.tabs.kanban")}
                </Button>
            </div>
            <div className="w-full">
                {viewMode === ListMissionsViewMode.Kanban ? (
                    <KanbanView missions={[]} />
                ) : (
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-xl font-semibold">{t("missions.tableView.title")}</h1>
                                <p className="text-sm text-muted-foreground">{t("missions.tableView.subtitle")}</p>
                            </div>
                            <Button onClick={() => push(MissionRoutes.Add)}>
                                {t("missions.addMission")}
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
