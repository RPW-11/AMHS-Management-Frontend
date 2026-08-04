"use client"
import { useCallback, useEffect } from "react";
import { EventStreamContentType, fetchEventSource } from "@microsoft/fetch-event-source";
import { useUserStore } from "@/stores/useAuthStore";
import { NotificationData } from "@/types/general";
import { toastNotification } from "./toastNotificationHandler";
import { useQueryClient } from "@tanstack/react-query";
import { useUnauthorized } from "../useUnauthorized";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

class FatalStreamError extends Error {}

export const useStreamNotification = () => {
    const { user, isHydrated } = useUserStore();
    const queryClient = useQueryClient();
    const handleUnauthorized = useUnauthorized();
    const { t } = useTranslation();

    const handleNotificationMessage = async (data: NotificationData) => {
        toastNotification(data);
        if (data.targetType.toLowerCase() === "mission") {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["mission", data.targetId]}),
                queryClient.invalidateQueries({ queryKey: ["missions"]}),
                queryClient.invalidateQueries({ queryKey: ["notifications"]})
            ])
        }
    }

    const handleStreamNotification = useCallback((token: string) => {
        const ctrl = new AbortController();

        fetchEventSource(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/notifications/stream`, {
            signal: ctrl.signal,
            headers: { Authorization: `Bearer ${token}` },
            async onopen(response) {
                if (response.status === 401) {
                    ctrl.abort();
                    handleUnauthorized();
                }

                const contentType = response.headers.get("content-type");
                if (response.ok && contentType?.startsWith(EventStreamContentType)) {
                    return;
                }

                throw new FatalStreamError(`Notification stream failed to open: ${response.status}`);
            },
            onmessage(msg) {
                if (msg.data) {
                    const data = JSON.parse(msg.data) as NotificationData;
                    handleNotificationMessage(data)
                }
            },
            onerror(err) {
                console.log(`Notification streaming error: ${err}`);
                if (err instanceof FatalStreamError) {
                    toast.error(t("notification.streamFailed"));
                    throw err;
                }
                // transient failure, let the library retry
            },
        });

        return () => ctrl.abort();
    }, [handleUnauthorized, t])

    useEffect(() => {
        if (isHydrated && user?.token) {
            return handleStreamNotification(user.token);
        }
    }, [isHydrated, user?.token, handleStreamNotification])
}