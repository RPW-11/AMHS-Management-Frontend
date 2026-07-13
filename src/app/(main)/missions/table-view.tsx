import LoadingSpinner from "@/components/loading-spinner";
import MissionCategoryBadge from "@/components/mission/mission-category-badge";
import MissionStatusBadge from "@/components/mission/mission-status";
import SelectedMissionActions from "@/components/mission/selected-mission-actions";
import TableViewActionButtons from "@/components/mission/table-view-action-buttons";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useLoadMission } from "@/hooks/mission/useLoadMission";
import { usePagination } from "@/hooks/usePagination";
import { parsedTimeStampToDateTime } from "@/utils/general-util";
import { CircleX } from "lucide-react";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useTranslation } from "react-i18next";

const TableView = () => {
    const { t } = useTranslation();
    const {
        missions,
        isLoading,
        isFetching,
        error,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNext,
        hasPrevious,
    } = useLoadMission();
    const { getSearchParamValue, setSearchParamValue } = usePagination();
    const [selectedMissionIds, setSelectedMissionIds] = useState<Set<string>>(
        new Set(),
    );
    const [searchTerm, setSearchTerm] = useState<string>("");

    const status = getSearchParamValue("status") ?? "all";

    const handleToggleAllMissions = () => {
        if (selectedMissionIds.size === missions.length) {
            setSelectedMissionIds(new Set());
        } else {
            setSelectedMissionIds(
                new Set(missions.map((mission) => mission.id)),
            );
        }
    };

    const handleToggleMission = (missionId: string) => {
        const newSelectedIds = new Set(selectedMissionIds);
        if (selectedMissionIds.has(missionId)) {
            newSelectedIds.delete(missionId);
        } else {
            newSelectedIds.add(missionId);
        }
        setSelectedMissionIds(newSelectedIds);
    };

    const handleChangeStatus = (status: string) => {
        if (status === "all") {
            setSearchParamValue("status", "");
        } else {
            setSearchParamValue("status", status);
        }
    };

    const debounceSearchMission = useDebouncedCallback((query: string) => {
        setSearchParamValue("name", query);
    }, 400)

    const handleSearchMission = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        debounceSearchMission(searchTerm);
    }

    if (error) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-center">
                <CircleX size={24} className="text-red-500" />
                <div className="text-lg text-red-500">
                    {t("missions.errorFetching")}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {selectedMissionIds.size > 0 && (
                <SelectedMissionActions
                    onDelete={() => setSelectedMissionIds(new Set())}
                    selectedIds={Array.from(selectedMissionIds)}
                />
            )}
            <div className="flex justify-between items-center">
                <div className="border rounded-md w-fit overflow-hidden">
                    <Button
                        onClick={() => handleChangeStatus("all")}
                        size={"sm"}
                        className="rounded-none"
                        variant={status === "all" ? "secondary" : "ghost"}
                    >
                        {t("missions.filter.all")}
                    </Button>
                    <Button
                        onClick={() => handleChangeStatus("active")}
                        size={"sm"}
                        className="rounded-none"
                        variant={status === "active" ? "secondary" : "ghost"}
                    >
                        {t("missions.filter.active")}
                    </Button>
                    <Button
                        onClick={() => handleChangeStatus("finished")}
                        size={"sm"}
                        className="rounded-none"
                        variant={status === "finished" ? "secondary" : "ghost"}
                    >
                        {t("missions.filter.finished")}
                    </Button>
                    <Button
                        onClick={() => handleChangeStatus("inactive")}
                        size={"sm"}
                        className="rounded-none"
                        variant={status === "inactive" ? "secondary" : "ghost"}
                    >
                        {t("missions.filter.inactive")}
                    </Button>
                </div>
                <Input
                    placeholder={t("missions.searchPlaceholder")}
                    className="w-72"
                    value={searchTerm}
                    onChange={(e) => handleSearchMission(e.target.value)}
                />
            </div>
            {isLoading || isFetching ? (
                <div className="w-full h-full flex justify-center">
                    <LoadingSpinner />
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Checkbox
                                    checked={
                                        selectedMissionIds.size !== 0 &&
                                        selectedMissionIds.size ===
                                            missions.length
                                    }
                                    onCheckedChange={handleToggleAllMissions}
                                />
                            </TableHead>
                            <TableHead>{t("missions.table.no")}</TableHead>
                            <TableHead>{t("missions.table.name")}</TableHead>
                            <TableHead>{t("missions.table.category")}</TableHead>
                            <TableHead>{t("missions.table.status")}</TableHead>
                            <TableHead>{t("missions.table.updatedAt")}</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {missions.length > 0 ? (
                            missions.map((mission, i) => (
                                <TableRow key={mission.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedMissionIds.has(
                                                mission.id,
                                            )}
                                            onCheckedChange={() =>
                                                handleToggleMission(mission.id)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {(page - 1) * pageSize + i + 1}
                                    </TableCell>
                                    <TableCell>{mission.name}</TableCell>
                                    <TableCell>
                                        <MissionCategoryBadge
                                            category={mission.category}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <MissionStatusBadge mission={mission}/>
                                    </TableCell>
                                    <TableCell>
                                        {parsedTimeStampToDateTime(
                                            mission.updatedAt,
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <TableViewActionButtons
                                            mission={mission}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    {t("missions.table.noMissionsAvailable")}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={6}>{t("missions.table.totalMissions")}</TableCell>
                            <TableCell className="text-right">
                                {totalCount}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            )}
            <Pagination
                page={page}
                pageSize={pageSize}
                totalPages={totalPages}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
                disabled={isLoading}
            />
        </div>
    );
};

export default TableView;
