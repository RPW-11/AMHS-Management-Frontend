import { MissionStatus } from "@/constants/mission";
import { Badge } from "../ui/badge";

interface MissionStatusProps {
    status: MissionStatus
}

const MissionStatusBadge = ({
    status
}: MissionStatusProps) => {
    const variant = status === MissionStatus.Active
                    ? "info" :
                    status === MissionStatus.Finished
                    ? "success" :
                    "danger"
    return (
        <Badge 
        variant={variant}
        >
            { status }
        </Badge>
    );
}
 
export default MissionStatusBadge;