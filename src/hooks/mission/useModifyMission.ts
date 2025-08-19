"use client"
import { ApiError } from "@/types/general";
import { UpdateMissionRequest } from "@/types/mission";
import { useCallback } from "react";

export const useModifyMission = () => {
    const updateMissionApi = useCallback(async (updateMissionReq: UpdateMissionRequest, missionId: string): Promise<ApiError|null> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateMissionReq)          
            })

            if (!response.ok) {
                const data = await response.json()
                return { title: data.title, details: data.details } as ApiError
            }

            return null
        } catch (error) {
            return { title: (error as Error).message, details: "" }
        }
    }, []);

    return { updateMissionApi }
}