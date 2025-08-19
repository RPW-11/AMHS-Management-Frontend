import { ApiError } from "@/types/general";
import { useCallback } from "react";

export const useDeleteMission = () => {
    const deleteMissionApi = useCallback(async (missionId: string): Promise<ApiError|null> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
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

    return { deleteMissionApi }
}