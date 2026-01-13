"use client";
import MissionCategoryBadge from "@/components/mission/mission-category-badge";
import MissionMember from "@/components/mission/mission-member";
import MissionMembers from "@/components/mission/mission-members";
import MissionStatusBadge from "@/components/mission/mission-status";
import { Mission } from "@/types/mission";
import { parsedTimeStampToDateTime } from "@/utils/general-util";
import {
    CalendarFold,
    CircleUserRound,
    Layers2,
    Loader,
    Users,
} from "lucide-react";

interface MissionMetadataProps {
    mission: Mission;
}

const MissionMetadata = ({ mission }: MissionMetadataProps) => {
    return (
        <div className="grid grid-cols-6 text-sm gap-2">
            <div className="col-span-1 flex items-center gap-2 text-muted-foreground">
                <Layers2 size={15} />
                <div className="font-medium">Type</div>
            </div>
            <div className="col-span-5">
                <MissionCategoryBadge category={mission.category} />
            </div>
            <div className="col-span-1 flex items-center gap-2 text-muted-foreground">
                <CalendarFold size={15} />
                <div className="font-medium">Deadline</div>
            </div>
            <div className="col-span-5">
                {parsedTimeStampToDateTime(mission.finishedAt)}
            </div>
            <div className="col-span-1 flex items-center gap-2 text-muted-foreground">
                <CircleUserRound size={15} />
                <div className="font-medium">Leader</div>
            </div>
            <div className="col-span-5">
                <MissionMember {...mission.leader} />
            </div>
            <div className="col-span-1 flex items-center gap-2 text-muted-foreground">
                <CalendarFold size={15} />
                <div className="font-medium">Created Date</div>
            </div>
            <div className="col-span-5">
                {parsedTimeStampToDateTime(mission.createdAt)}
            </div>
            <div className="col-span-1 flex items-center gap-2 text-muted-foreground">
                <Loader size={15} />
                <div className="font-medium">Status</div>
            </div>
            <div className="col-span-5">
                <MissionStatusBadge status={mission.status} />
            </div>
            <div className="col-span-1 flex items-center gap-2 text-muted-foreground">
                <Users size={15} />
                <div className="font-medium">Members</div>
            </div>
            <div className="col-span-5">
                <MissionMembers mission={mission} />
            </div>
        </div>
    );
};

export default MissionMetadata;
