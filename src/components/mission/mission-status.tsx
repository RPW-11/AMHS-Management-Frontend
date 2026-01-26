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
    const variant =
        localStatus === MissionStatus.Active
            ? "success"
            : localStatus === MissionStatus.Finished
              ? "default"
              : "destructive";

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
                    variant={variant}
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
                    variant={"success"}
                    onClick={() => handleChangeStatus(MissionStatus.Active)}
                >
                    {"Active"}
                </Badge>
                <Badge
                    className="cursor-pointer hover:shadow"
                    variant={"default"}
                    onClick={() => handleChangeStatus(MissionStatus.Finished)}
                >
                    {"Finished"}
                </Badge>
                <Badge
                    className="cursor-pointer hover:shadow"
                    variant={"destructive"}
                    onClick={() => handleChangeStatus(MissionStatus.Inactive)}
                >
                    {"Inactive"}
                </Badge>
            </PopoverContent>
        </Popover>
    );
};

export default MissionStatusBadge;
