"use client"
import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { ApiError } from "@/types/general";
import { MissionDetail } from "@/types/mission";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLoadDetailedMission = (missionId?: string) => {
    const { user, isHydrated } = useUserStore()
    const { push } = useRouter()
    
    const { data, isLoading, isFetching, error } = useQuery<MissionDetail>({
        queryKey: ["mission", missionId],
        queryFn: async () => {
            if (!user?.token) {
                push(Routes.Login);
                throw new Error("Unauthorized");
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}`, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (response.status === 401) {
                push(Routes.Login)
                throw new Error("Unauthorized");

            }

            if (response.status === 404) {
                push(Routes.NotFound)
                throw new Error("Mission not found");

            }

            const data = await response.json()

            if (!response.ok) {
                toast.error((data as ApiError).title)
                throw new Error((data as ApiError).title);
            }

            return data as MissionDetail
        },
        enabled: isHydrated && !!user?.token,
    })

    const mission = data;

    return {
        mission,
        isLoading,
        isFetching,
        error
    };
}
 