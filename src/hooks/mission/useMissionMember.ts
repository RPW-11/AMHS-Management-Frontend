"use client"

import { Routes } from "@/constants/general"
import { useUserStore } from "@/stores/useAuthStore"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { toast } from "sonner"

export const useMissionMember = (missionId?: string) => {
    const { user } = useUserStore()
    const { push } = useRouter()
    
    const addMemberToMissionHandler = useCallback(async (memberId: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}/members/add/${memberId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                }         
            })
            
            if (response.status === 401) {
                return push(Routes.Login)
            }

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.title)
            }
        } catch (error) {
            throw error
        }
    }, [user])

    const addMemberToMission = (memberId: string) => toast.promise(addMemberToMissionHandler(memberId), {
        loading: "Adding a member...",
        success: "Member added successfully",
        error: (error) => error as string
    })

    return {
        addMemberToMission
    }
}