import { MissionStatus } from "@/constants/mission";
import { Badge } from "../ui/badge";

interface MissionStatusProps {
    status: MissionStatus
}

const MissionStatusBadge = ({
    status
}: MissionStatusProps) => {
    const variant = status === MissionStatus.Active
                    ? "success" :
                    status === MissionStatus.Finished
                    ? "default" :
                    "destructive"
    return (
        <Badge 
        variant={variant}
        >
            { status }
        </Badge>
    );
}
 
export default MissionStatusBadge;