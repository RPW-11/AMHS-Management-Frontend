"use client"

import { Routes } from "@/constants/general"
import { useUserStore } from "@/stores/useAuthStore"
import { Employee } from "@/types/employee"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export const useEmployee = () => {
    const { user, isHydrated } = useUserStore();
    
    const { push } = useRouter()
    const [employees, setEmployess] = useState<Employee[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [fetchError, setFetchError] = useState<string | null>(null)
    
    const fetchAllEmployees = useCallback(async () => {
        setIsFetching(true)
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/employees`, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (result.status === 401) {
                return push(Routes.Login)
            }

            const data = await result.json()

            if(!result.ok) {
                return setFetchError(data.title)
            }

            setEmployess(data)
            setFetchError(null)

        } catch (error) {
            setFetchError((error as Error).message)
        } finally {
            setIsFetching(false)
        }
    }, [user])

    useEffect(() => {
        const fetchData = () => fetchAllEmployees()
        if (isHydrated) {
            fetchData()
        }
    }, [isHydrated])
    
    return {
        employees,
        fetchError,
        isFetching
    };
}