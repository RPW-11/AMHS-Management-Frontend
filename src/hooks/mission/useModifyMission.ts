"use client";
import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { UpdateMissionRequest } from "@/types/mission";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useModifyMission = () => {
    const { user } = useUserStore();
    const { push } = useRouter();

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
            if (!user?.token) throw new Error("Unauthorized");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify(data),
                },
            );

            if (response.status === 401) {
                push(Routes.Login);
                throw new Error("Unauthorized");
            }

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.title || "Failed to update mission");
            }

            if(onSuccessCb) onSuccessCb();
        },

        onError: (err) => {
            toast.error((err as Error).message || "Failed to update mission", {
                duration: 3000,
                onAutoClose: () => toast.dismiss(),
            });
        },
    });
};
