"use client"

import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { Mission } from "@/types/mission";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useLoadDetailedMission = (missionId?: string) => {
    const { user, isHydrated } = useUserStore()
    const { push } = useRouter()
    const [mission, setMission] = useState<Mission>()
    const [isFetchingMission, setIsFetchingMission] = useState<boolean>(true)

    const fetchMissionById = useCallback(async () => {
        setIsFetchingMission(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}`, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (response.status === 401) {
                push(Routes.Login)
                return
            }

            const data = await response.json()

            if (!response.ok) {
                toast.error(data.title)
            }

            setMission(data)
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setIsFetchingMission(false)
        }
    }, [user, missionId])

    useEffect(() => {
        const fetchData = () => fetchMissionById()
        if (isHydrated && missionId) {
            fetchData()
        }
    }, [isHydrated, missionId])

    return {
        mission,
        isFetchingMission
    };
}
 