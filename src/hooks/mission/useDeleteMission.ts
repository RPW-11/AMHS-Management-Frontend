import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { ApiError } from "@/types/general";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useDeleteMission = () => {
    const { user } = useUserStore();
    const { push } = useRouter()
    const deleteMissionApi = useCallback(async (missionId: string): Promise<ApiError|null> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (response.status === 401) {
                push(Routes.Login)
                return null
            }

            if (!response.ok) {
                const data = await response.json()
                return { title: data.title, details: data.details } as ApiError
            }

            return null
        } catch (error) {
            return { title: (error as Error).message, details: "" }
        }
    }, []);

    return { deleteMissionApi }
}