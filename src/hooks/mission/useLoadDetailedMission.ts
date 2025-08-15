"use client"

import { Mission } from "@/types/mission";
import { useState } from "react";
import { toast } from "sonner";

export const useLoadDetailedMission = () => {
    const [mission, setMission] = useState<Mission>()
    const [isFetchingMission, setIsFetchingMission] = useState<boolean>(true)

    const fetchMissionById = async (missionId: string) => {
        setIsFetchingMission(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}`)
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
    }

    return {
        mission,
        isFetchingMission,
        fetchMissionById
    };
}
 