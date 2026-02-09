"use client";
import { Bell, CheckCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Label } from "../ui/label";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { NotificationData } from "@/types/general";
import NotificationCard from "./notification-card";
import { useLoadNotification } from "@/hooks/notification/useLoadNotification";
import { MissionRoutes, Routes } from "@/constants/general";
import { useRouter } from "next/navigation";
import { useStreamNotification } from "@/hooks/notification/useStreamNotification";
import { useMarkAsReadNotification } from "@/hooks/notification/useMarkAsReadNotification";
import { usePagination } from "@/hooks/usePagination";

const Notification = () => {
    useStreamNotification();
    const {
        notifications,
        isLoading,
        type:currType,
    } = useLoadNotification();
    const { mutate: markAsRead } = useMarkAsReadNotification();
    const { push } = useRouter();
    const { setSearchParamValue } = usePagination();

    const DISPLAY_TYPES = ["ALL", "UNREAD", "READ"];
    
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleChangeDisplayType = (displayType: string) => {
        setSearchParamValue("type", displayType.toLowerCase() === "all" ? "" : displayType.toLowerCase());
    }

    const handleClickNotification = (notification: NotificationData) => {
        if (notification.targetType.toLowerCase() === "mission") {
            push(MissionRoutes.Detail(notification.targetId));
        }
    };

    const hasUnreadNotification = (): boolean => {
        return notifications.some(n => !n.isRead) && notifications.length !== 0;
    }

    const handleMarkAsRead = (notificationId: string) => markAsRead(notificationId);

    const handleClickViewNotification = () => {
        setIsOpen(false);
        push(Routes.Notification);
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    className="text-muted-foreground relative"
                    disabled={isLoading}
                >
                    <Bell />
                    {hasUnreadNotification() && (
                        <div className="absolute top-[6px] right-[6px] rounded-full h-1.5 w-1.5 bg-primary"></div>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-120 h-100 overflow-hidden"
                align="end"
                alignOffset={-40}
            >
                <div className="space-y-1 flex flex-col h-full">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <div className="flex-1 flex flex-col justify-between gap-2 overflow-hidden">
                        <div className="flex items-center">
                            {DISPLAY_TYPES.map((type) => (
                                <Label
                                    onClick={() => handleChangeDisplayType(type)}
                                    key={type}
                                    className={`cursor-pointer text-sm w-16 py-0.5 px-2 border-b-2 transition-all duration-200 ${currType === type.toLowerCase() ? "border-primary text-primary" : "border-white hover:text-primary text-muted-foreground font-normal"}`}
                                >
                                    {type.slice(0, 1).toUpperCase() +
                                        type.slice(1).toLowerCase()}
                                </Label>
                            ))}
                        </div>
                        <div className="flex-1 overflow-auto">
                            {isLoading ? (
                                <div className="rounded-lg h-full bg-gray-100 animate-pulse"></div>
                            ) : notifications.length === 0 ? (
                                <div className="text-muted-foreground text-sm font-medium h-full flex justify-center items-center">
                                    No notifications
                                </div>
                            ) : (
                                notifications.map((item) => (
                                    <NotificationCard
                                        key={item.id}
                                        data={item}
                                        onRead={() =>
                                            handleClickNotification(item)
                                        }
                                        onMarkAsRead={handleMarkAsRead}
                                    />
                                ))
                            )}
                        </div>
                        <div className="space-y-2">
                            <Separator />
                            <div className="flex justify-between gap-4">
                                <Button
                                    variant={"ghost"}
                                    size={"sm"}
                                    className="text-xs text-primary"
                                >
                                    <CheckCheck />
                                    Mark all as read
                                </Button>
                                <Button
                                    variant={"default"}
                                    size={"sm"}
                                    className="text-xs"
                                    onClick={handleClickViewNotification}
                                >
                                    View all notification
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default Notification;
