"use client"
import RoutePlanningFinishedCard from "@/components/notification/route-planning-finished-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NotificationPage = () => {
    const handleClickToast = () => toast.custom((id) => <RoutePlanningFinishedCard key={id}
        notificationData={{
            id: "TIPPY",
            message: "Mission What ever has finished calculating dan dan dan dan",
            actorName: "",
            actorAvatarUrl: "",
            targetId: "a918e78a-38da-421a-b01a-2977dc670fe0",
            targetType: "MISSION",
            isRead: false,
            createdAt: new Date().toString(),
        }}/>,
    {
        position: "top-center"
    })
    return (
        <div className="">
            <Button onClick={handleClickToast}>Testy Zesty</Button>
        </div>
    )
};

export default NotificationPage;
