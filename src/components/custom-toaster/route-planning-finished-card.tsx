import { NotificationData } from "@/types/general";
import { Route } from "lucide-react";
import Link from "next/link";
import { MissionRoutes } from "@/constants/general";

interface RoutePlanningFinishedCardProps {
    notificationData: NotificationData;
}

const RoutePlanningFinishedCard = ({
    notificationData,
}: RoutePlanningFinishedCardProps) => {
    return (
        <Link href={MissionRoutes.Detail(notificationData.targetId)} >
            <div className="px-4 py-3 rounded-md border bg-white w-92 hover:bg-gray-50 shadow">
                <div className="flex items-center gap-3">
                    <div className="bg-secondary rounded-lg p-2">
                        <Route size={24} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-sm truncate w-72">
                            Route has been calculated!
                        </h2>
                        <p className="text-xs text-muted-foreground truncate w-72">
                            {notificationData.message}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RoutePlanningFinishedCard;
