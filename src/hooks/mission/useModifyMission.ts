"use client";
import { useUserStore } from "@/stores/useAuthStore";
import { UpdateMissionRequest } from "@/types/mission";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UnauthorizedError, useUnauthorized } from "../useUnauthorized";

export const useModifyMission = () => {
    const { user } = useUserStore();
    const handleUnauthorized = useUnauthorized();

    return useMutation({
        mutationFn: async ({
            missionId,
            data,
            onSuccessCb
        }: {
            missionId: string;
            data: UpdateMissionRequest;
            onSuccessCb?: () => void;
        }) => {
            if (!user?.token) handleUnauthorized();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                    body: JSON.stringify(data),
                },
            );

            if (response.status === 401) {
                handleUnauthorized();
            }

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.title || "Failed to update mission");
            }

            if(onSuccessCb) onSuccessCb();
        },

        onError: (err) => {
            if (err instanceof UnauthorizedError) return;
            toast.error((err as Error).message || "Failed to update mission", {
                duration: 3000,
                onAutoClose: () => toast.dismiss(),
            });
        },
    });
};
