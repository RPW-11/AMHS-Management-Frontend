"use client";
import NotificationCard from "@/components/header/notification-card";
import LoadingSpinner from "@/components/loading-spinner";
import Pagination from "@/components/pagination";
import { Label } from "@/components/ui/label";
import { MissionRoutes } from "@/constants/general";
import { useLoadNotification } from "@/hooks/notification/useLoadNotification";
import { useMarkAsReadNotification } from "@/hooks/notification/useMarkAsReadNotification";
import { usePagination } from "@/hooks/usePagination";
import { NotificationData } from "@/types/general";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const NotificationPage = () => {
    const {
        notifications,
        isLoading,
        page,
        pageSize,
        hasNext,
        hasPrevious,
        totalPages,
        type:currType,
        error
    } = useLoadNotification();
    const { mutate: markAsRead } = useMarkAsReadNotification();
    const { push } = useRouter();
    const { setSearchParamValue } = usePagination();
    const { t } = useTranslation();

    const DISPLAY_TYPES = ["ALL", "UNREAD", "READ"];

    const handleChangeDisplayType = (displayType: string) => {

        setSearchParamValue("type", displayType.toLowerCase() === "all" ? "" : displayType.toLowerCase());
    }

    const handleClickNotification = (notification: NotificationData) => {
        if (notification.targetType.toLowerCase() === "mission") {
            push(MissionRoutes.Detail(notification.targetId));
        }
    };

    const handleMarkAsRead = (notificationId: string) => markAsRead(notificationId);

    return (
        <div className="rounded-md p-4 bg-white border space-y-6 flex flex-col">
            <div className="flex items-center gap-4 justify-between">
                <div>
                    <h1 className="text-xl font-semibold">{t("notification.title")}</h1>
                    <p className="text-sm text-muted-foreground">
                        {t("notification.subtitle")}
                    </p>
                </div>
                <div className="flex items-center">
                    {DISPLAY_TYPES.map((type) => (
                        <Label
                            onClick={() => handleChangeDisplayType(type)}
                            key={type}
                            className={`cursor-pointer text-sm w-16 py-0.5 px-2 border-b-2 transition-all duration-200 ${currType === type.toLowerCase() ? "border-primary text-primary" : "border-white hover:text-primary text-muted-foreground font-normal"}`}
                        >
                            {t(`notification.displayTypes.${type.toLowerCase()}`)}
                        </Label>
                    ))}
                </div>
            </div>
            {isLoading ? (
                <LoadingSpinner/>
            ) : error ? (
                <div className="text-destructive mb-6 font-medium h-full flex justify-center items-center">
                    {t("notification.errorOccurred")}
                </div>
            ) : notifications.length === 0 ? (
                <div className="text-muted-foreground mb-6 font-medium h-full flex justify-center items-center">
                    {t("notification.noNotifications")}
                </div>
            ) : (
                <div>
                    {notifications.map((data) => (
                        <NotificationCard
                            key={data.id}
                            data={data}
                            onRead={() => handleClickNotification(data)}
                            onMarkAsRead={handleMarkAsRead}
                        />
                    ))}
                </div>
            )}
            <Pagination
                disabled={isLoading}
                page={page}
                pageSize={pageSize}
                totalPages={totalPages}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
            />
        </div>
    );
};

export default NotificationPage;
