import { Routes } from "@/constants/general"
import { useUserStore } from "@/stores/useAuthStore"
import { ApiError } from "@/types/general"
import { CreateRgvPathPlanReq } from "@/types/toolcase"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

export const useRgvRouteSolver = () => {
    const { user } = useUserStore()
    const { push } = useRouter()
    
    const submitRgvRoutePlan = useCallback(async (createRgvPlanReq: CreateRgvPathPlanReq, missionId: string): Promise<ApiError|null> => {
        try {
            const requestForm = new FormData()
            requestForm.append("Image", createRgvPlanReq.image)
            requestForm.append("RouteMetaData", JSON.stringify(createRgvPlanReq.routeMetaData))
            
            const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}/route-planning`, {
                method: "PATCH",
                body: requestForm,
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (result.status === 401) {
                push(Routes.Login)
                return null
            }

            if(!result.ok) {
                const data = await result.json()
                return { title: data.title, details: data.details }
            }

            return null
        } catch (error) {
            return { title: (error as Error).message }
        }
    }, [])
    return { submitRgvRoutePlan }
}