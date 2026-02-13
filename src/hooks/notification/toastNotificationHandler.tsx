import RoutePlanningFinishedCard from "@/components/custom-toaster/route-planning-finished-card";
import { NotificationData } from "@/types/general";
import { toast } from "sonner";

export const toastNotification = (notificationData: NotificationData) => {
    if (notificationData.targetType.toLowerCase() === "mission") {
        toast.custom(
            (id) => (
                <RoutePlanningFinishedCard
                    key={id}
                    notificationData={notificationData}
                />
            ),
            {
                position: "top-center",
            },
        );
        return;
    }
    toast.info(notificationData.message);
};
