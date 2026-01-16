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
import { Mission } from "@/types/mission";
import { parsedTimeStampToDateTime } from "@/utils/general-util";
import React, { useState } from "react";

interface TableViewProps {
    missions: Mission[];
}

const TableView = ({ missions }: TableViewProps) => {
    const { page, pageSize, totalCount, totalPages, hasNext, hasPrevious } =
        useLoadMission();
    const [currentStatus, setCurrentStatus] = useState<string>("All");
    const [selectedMissionIds, setSelectedMissionIds] = useState<Set<string>>(
        new Set()
    );

    const handleToggleAllMissions = () => {
        if (selectedMissionIds.size === missions.length) {
            setSelectedMissionIds(new Set());
        } else {
            setSelectedMissionIds(
                new Set(missions.map((mission) => mission.id))
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

    return (
        <div className="space-y-4 relative">
            {selectedMissionIds.size > 0 && (
                <SelectedMissionActions
                    selectedIds={Array.from(selectedMissionIds)}
                />
            )}
            <div className="flex justify-between items-center">
                <div className="border rounded-md w-fit overflow-hidden">
                    <Button
                        size={"sm"}
                        className="rounded-none"
                        variant={"secondary"}
                    >
                        All
                    </Button>
                    <Button
                        size={"sm"}
                        className="rounded-none"
                        variant={"ghost"}
                    >
                        Active
                    </Button>
                    <Button
                        size={"sm"}
                        className="rounded-none"
                        variant={"ghost"}
                    >
                        Finished
                    </Button>
                    <Button
                        size={"sm"}
                        className="rounded-none"
                        variant={"ghost"}
                    >
                        Inactive
                    </Button>
                </div>
                <Input placeholder="Search mission..." className="w-72" />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox
                                checked={
                                    selectedMissionIds.size !== 0 &&
                                    selectedMissionIds.size === missions.length
                                }
                                onCheckedChange={handleToggleAllMissions}
                            />
                        </TableHead>
                        <TableHead>No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Updated At</TableHead>
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
                                            mission.id
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
                                    <MissionStatusBadge
                                        status={mission.status}
                                    />
                                </TableCell>
                                <TableCell>
                                    {parsedTimeStampToDateTime(
                                        mission.updatedAt
                                    )}
                                </TableCell>
                                <TableCell>
                                    <TableViewActionButtons mission={mission} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No missions available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}>Total missions</TableCell>
                        <TableCell className="text-right">{totalCount}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            {missions.length > 0 && (
                <Pagination
                    page={page}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    hasNext={hasNext}
                    hasPrevious={hasPrevious}
                />
            )}
        </div>
    );
};

export default TableView;
