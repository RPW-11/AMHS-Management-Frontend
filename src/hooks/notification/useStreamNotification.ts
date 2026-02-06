"use client"
import { useCallback, useEffect } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useUserStore } from "@/stores/useAuthStore";
import { NotificationData } from "@/types/general";
import { toastNotification } from "./toastNotificationHandler";
import { useQueryClient } from "@tanstack/react-query";

export const useStreamNotification = () => {
    const { user, isHydrated } = useUserStore();
    const queryClient = useQueryClient();

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
            onmessage(msg) {
                if (msg.data) {
                    const data = JSON.parse(msg.data) as NotificationData;
                    handleNotificationMessage(data)
                }
            },
            onerror(err) {
                console.log(`Notification streaming error: ${err}`);
                // handle retry or abort
            },
        });

        return () => ctrl.abort();
    }, [])

    useEffect(() => {
        if (isHydrated && user?.token) {
            handleStreamNotification(user.token);
        }
    }, [isHydrated, user?.token, handleStreamNotification])
}