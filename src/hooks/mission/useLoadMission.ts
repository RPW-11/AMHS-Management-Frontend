"use client"

import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { Mission } from "@/types/mission";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useLoadMission = () => {
    const { user } = useUserStore()
    const { push } = useRouter();
    const [missions, setMissions] = useState<Mission[]>([])
    const [isFetchingMissions, setIsFetchingMissions] = useState<boolean>(true)

    const fetchMissions = async () => {
        setIsFetchingMissions(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions`, {
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

            setMissions(data)
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setIsFetchingMissions(false)
        }
    }

    useEffect(() => {
        const fetchResource = () => fetchMissions()
        fetchResource()
    }, [])

    return {
        missions,
        isFetchingMissions
    };
}
 