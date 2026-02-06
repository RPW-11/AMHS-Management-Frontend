import { MissionStatus } from "@/constants/mission";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { useModifyMission } from "@/hooks/mission/useModifyMission";
import LoadingSpinner from "../loading-spinner";
import { Mission } from "@/types/mission";

interface MissionStatusProps {
    mission: Mission
}

const MissionStatusBadge = ({ mission }: MissionStatusProps) => {
    const { mutate: changeStatus, isPending } = useModifyMission();
    const [localStatus, setLocalStatus] = useState<string>(mission.status);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const getVariant = (status: string) => {
        return status === MissionStatus.Active
            ? "secondary"
            : status === MissionStatus.Finished
            ? "success"
            : status === MissionStatus.Processing
            ? "default"
            : status === MissionStatus.Failed
            ? "danger"
            : "destructive";
    }
        

    const handleChangeStatus = (status: string) =>{
        setIsOpen(false);
        changeStatus({
            missionId: mission.id,
            data: { 
                ...mission ,
                status: status,
            },
            onSuccessCb() {
                setLocalStatus(status);
            },
        });
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger className="cursor-pointer">
                {isPending ? 
                <LoadingSpinner size="sm"/>
                :
                <Badge
                    className="hover:shadow"
                    variant={getVariant(localStatus)}
                >
                    {localStatus}
                </Badge>
                }
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="p-2 flex flex-wrap gap-2 max-w-40"
            >
                <Badge
                    className="cursor-pointer hover:shadow"
                    variant={getVariant(MissionStatus.Active)}
                    onClick={() => handleChangeStatus(MissionStatus.Active)}
                >
                    {MissionStatus.Active}
                </Badge>
                <Badge
                    className="cursor-pointer hover:shadow"
                    variant={getVariant(MissionStatus.Finished)}
                    onClick={() => handleChangeStatus(MissionStatus.Finished)}
                >
                    {MissionStatus.Finished}
                </Badge>
                <Badge
                    className="cursor-pointer hover:shadow"
                    variant={getVariant(MissionStatus.Inactive)}
                    onClick={() => handleChangeStatus(MissionStatus.Inactive)}
                >
                    {MissionStatus.Inactive}
                </Badge>
                <Badge
                    className="cursor-pointer hover:shadow"
                    variant={getVariant(MissionStatus.Failed)}
                    onClick={() => handleChangeStatus(MissionStatus.Failed)}
                >
                    {MissionStatus.Failed}
                </Badge>
                <Badge
                    className="cursor-pointer hover:shadow"
                    variant={getVariant(MissionStatus.Processing)}
                    onClick={() => handleChangeStatus(MissionStatus.Processing)}
                >
                    {MissionStatus.Processing}
                </Badge>
            </PopoverContent>
        </Popover>
    );
};

export default MissionStatusBadge;
