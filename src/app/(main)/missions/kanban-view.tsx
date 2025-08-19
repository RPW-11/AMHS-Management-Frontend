"use client"

import MissionCard from "@/components/mission/mission-card";
import { MissionStatus } from "@/constants/mission";
import { useDeleteMission } from "@/hooks/mission/useDeleteMission";
import { useModifyMission } from "@/hooks/mission/useModifyMission";
import { Mission, UpdateMissionRequest } from "@/types/mission";
import { useState } from "react";
import { toast } from "sonner";

interface KanbanViewProps {
    missions: Mission[]
}

const KanbanView = ({
    missions
}: KanbanViewProps) => {
    const [activeMissions, setActiveMissions] = useState<Mission[]>(missions.filter(m => m.status === MissionStatus.Active))
    const [inactiveMissions, setInactiveMissions] = useState<Mission[]>(missions.filter(m => m.status === MissionStatus.Inactive))
    const [finishedMission, setFinishedMission] = useState<Mission[]>(missions.filter(m => m.status === MissionStatus.Finished))

    const { updateMissionApi } = useModifyMission()
    const { deleteMissionApi } = useDeleteMission()
    
    const handleUpdateMission = async (mission: Mission) => {
        const updateReq: UpdateMissionRequest = {
            name: mission.name,
            description: mission.description,
            status: mission.status
        }
        const result = await updateMissionApi(updateReq, mission.id);
        if (result) {
            toast.error(result.title)
        }
    }

    const handleMoveToActiveSection = (mission: Mission) => {
        if (inactiveMissions.find(m => m.id === mission.id)) {
            setInactiveMissions(inactiveMissions.filter(m => m.id !== mission.id))
        } else {
            setFinishedMission(finishedMission.filter(m => m.id !== mission.id))
        }
        mission.status = MissionStatus.Active
        handleUpdateMission(mission).then()
        setActiveMissions([...activeMissions, mission])
    }

    const handleMoveToFinishedSection = (mission: Mission) => {
        if (activeMissions.find(m => m.id === mission.id)) {
            setActiveMissions(activeMissions.filter(m => m.id !== mission.id))
        } else {
            setInactiveMissions(inactiveMissions.filter(m => m.id !== mission.id))
        }
        mission.status = MissionStatus.Finished
        handleUpdateMission(mission).then()
        setFinishedMission([...finishedMission, mission])
    }

    const handleMoveToInactiveSection = (mission: Mission) => {
        if (activeMissions.find(m => m.id === mission.id)) {
            setActiveMissions(activeMissions.filter(m => m.id !== mission.id))
        } else {
            setFinishedMission(finishedMission.filter(m => m.id !== mission.id))
        }
        mission.status = MissionStatus.Inactive
        handleUpdateMission(mission).then()
        setInactiveMissions([...inactiveMissions, mission])
    }

    const handleDeleteMission = async (mission: Mission) => {
        const error = await deleteMissionApi(mission.id)
        if (error) {
            toast.error(error.title)
        }
        setActiveMissions(prev => prev.filter(m => m.id !== mission.id))
        setInactiveMissions(prev => prev.filter(m => m.id !== mission.id))
        setFinishedMission(prev => prev.filter(m => m.id !== mission.id))
    }

    return (
        <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1 space-y-4">
                <h3 className="font-bold text-sm flex items-center gap-2">
                    {MissionStatus.Active}
                    <span className="relative flex size-2 bg-info-foreground rounded-full"></span>
                </h3>
                <div className="flex flex-col gap-4 p-2 rounded-md bg-gray-100">
                    {activeMissions.map(mission => (
                        <MissionCard 
                        onMoveToActiveSection={handleMoveToActiveSection}
                        onMoveToFinishedSection={handleMoveToFinishedSection}
                        onMoveToInactiveSection={handleMoveToInactiveSection}
                        onDeleteMission={handleDeleteMission} 
                        key={mission.id} mission={mission} />
                    ))}
                    {activeMissions.length === 0
                    &&
                    <div className="text-sm text-center">There are no active missions</div>
                    }
                </div>
            </div>
            <div className="col-span-1 space-y-4">
                <h3 className="font-bold text-sm flex items-center gap-2">
                    {MissionStatus.Finished}
                    <span className="relative flex size-2 bg-success-foreground rounded-full"></span>
                </h3>
                <div className="flex flex-col gap-4 p-2 rounded-md bg-gray-100">
                    {finishedMission.map(mission => (
                        <MissionCard 
                        onMoveToActiveSection={handleMoveToActiveSection}
                        onMoveToFinishedSection={handleMoveToFinishedSection}
                        onMoveToInactiveSection={handleMoveToInactiveSection} 
                        onDeleteMission={handleDeleteMission} 
                        key={mission.id} mission={mission} />
                    ))}
                    {finishedMission.length === 0
                    &&
                    <div className="text-sm text-center">There are no finished missions</div>
                    }
                </div>
            </div>
            <div className="col-span-1 space-y-4">
                <h3 className="font-bold text-sm flex items-center gap-2">
                    {MissionStatus.Inactive}
                    <span className="relative flex size-2 bg-destructive rounded-full"></span>
                </h3>
                <div className="flex flex-col gap-4 p-2 rounded-md bg-gray-100">
                    {inactiveMissions.map(mission => (
                        <MissionCard 
                        onMoveToActiveSection={handleMoveToActiveSection}
                        onMoveToFinishedSection={handleMoveToFinishedSection}
                        onMoveToInactiveSection={handleMoveToInactiveSection}
                        onDeleteMission={handleDeleteMission} 
                        key={mission.id} mission={mission} />
                    ))}
                    {inactiveMissions.length === 0
                    &&
                    <div className="text-sm text-center">There are no inactive missions</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default KanbanView;