"use client"

import { Mission } from "@/types/mission";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useLoadMission = () => {
    const [missions, setMissions] = useState<Mission[]>([])
    const [isFetchingMissions, setIsFetchingMissions] = useState<boolean>(true)

    const fetchMissions = async () => {
        setIsFetchingMissions(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions`)
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
 