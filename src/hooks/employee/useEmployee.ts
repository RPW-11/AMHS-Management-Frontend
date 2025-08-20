"use client"

import { Routes } from "@/constants/general"
import { useUserStore } from "@/stores/useAuthStore"
import { Employee } from "@/types/employee"
import { ApiError } from "@/types/general"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

export const useEmployee = () => {
    const { user } = useUserStore();
    const { push } = useRouter()
    const [employees, setEmployess] = useState<Employee[]>([])
    
    const fetchAllEmployees = useCallback(async (): Promise<ApiError|null> => {
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/employees`, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (result.status === 401) {
                push(Routes.Login)
                return null
            }

            const data = await result.json()


            if(!result.ok) {
                return { title: data.title, details: data.details }
            }

            setEmployess(data)

            return null
        } catch (error) {
            return { title: (error as Error).message }
        }
    }, [])
    
        return {
            employees,
            fetchAllEmployees
        };
}