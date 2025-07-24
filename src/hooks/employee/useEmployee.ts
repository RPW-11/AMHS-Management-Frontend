"use client"

import { Employee } from "@/types/employee"
import { ApiError } from "@/types/general"
import { useCallback, useState } from "react"

export const useEmployee = () => {

    const [employees, setEmployess] = useState<Employee[]>([])
    
    const fetchAllEmployees = useCallback(async (): Promise<ApiError|null> => {
        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/employees`)
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