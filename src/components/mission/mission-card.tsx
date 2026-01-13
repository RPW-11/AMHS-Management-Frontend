"use client"

import { Mission } from "@/types/mission";
import Link from "next/link";
import MissionIcon from "./mission-icon";
import { MissionRoutes } from "@/constants/general";
import { parsedTimeStampToDateTime } from "@/utils/general-util";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { MissionStatus } from "@/constants/mission";

interface MissionCardProps {
    mission: Mission,
    onMoveToActiveSection: (mission: Mission) => void
    onMoveToFinishedSection: (mission: Mission) => void
    onMoveToInactiveSection: (mission: Mission) => void
    onDeleteMission: (mission: Mission) => void
}

const MissionCard = ({
    mission,
    onMoveToActiveSection,
    onMoveToFinishedSection,
    onMoveToInactiveSection,
    onDeleteMission
}: MissionCardProps) => {
    
    const functionCoordinator = (missionStatus: MissionStatus) => {
        if (missionStatus === MissionStatus.Active) {
            onMoveToActiveSection(mission)
        } else if (missionStatus === MissionStatus.Finished) {
            onMoveToFinishedSection(mission)
        } else {
            onMoveToInactiveSection(mission)
        }
    }
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Link href={MissionRoutes.Detail(mission.id)}>
                    <div className="flexborder rounded-md p-4 space-y-2 bg-white hover:bg-accent shadow hover:text-primary">
                        <div className="flex justify-between gap-4">
                            <div>
                                <h2 className="font-semibold text-sm">{ mission.name }</h2>
                                <h3 className="text-xs">{ parsedTimeStampToDateTime(mission.finishedAt) }</h3>
                            </div>
                            <MissionIcon category={mission.category} size={20} />
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 lg:line-clamp-4">{ mission.description }</p>
                    </div>
                </Link>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem
                onClick={() => functionCoordinator(
                    mission.status === MissionStatus.Active ? MissionStatus.Inactive :
                    mission.status === MissionStatus.Finished ? MissionStatus.Active :
                    MissionStatus.Finished
                )}
                >Move to {
                    mission.status === MissionStatus.Active ? "Inactive" :
                    mission.status === MissionStatus.Finished ? "Active" :
                    "Finished"
                }</ContextMenuItem>
                <ContextMenuItem
                onClick={() => functionCoordinator(
                    mission.status === MissionStatus.Active ? MissionStatus.Finished :
                    mission.status === MissionStatus.Finished ? MissionStatus.Inactive :
                    MissionStatus.Active
                )}
                >Move to {
                    mission.status === MissionStatus.Active ? "Finished" :
                    mission.status === MissionStatus.Finished ? "Inactive" :
                    "Active"
                }</ContextMenuItem>
                <ContextMenuItem onClick={() => onDeleteMission(mission)}>Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
 
export default MissionCard;