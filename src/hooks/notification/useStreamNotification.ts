import { useCallback, useEffect } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useUserStore } from "@/stores/useAuthStore";
import { toast } from "sonner";
import { NotificationData } from "@/types/general";

export const useStreamNotification = () => {
    const { user, isHydrated } = useUserStore();

    const handleStreamNotification = useCallback((token: string) => {
        const ctrl = new AbortController();

        fetchEventSource(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/notifications/stream`, {
            signal: ctrl.signal,
            headers: { Authorization: `Bearer ${token}` },
            onmessage(msg) {
                if (msg.data) {
                    const data = JSON.parse(msg.data) as NotificationData;
                    console.log(data);
                    toast.info(data.message, {
                        position: "top-right"
                    })
                }
            },
            onerror(err) {
                console.log(err);
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