"use client"

import { Employee, LoginRequest } from "@/types/employee"
import { ApiError } from "@/types/general"
import { useCallback } from "react"

export const useAuth = () => {
    
    const login = useCallback(async (loginRequest: LoginRequest): Promise<[Employee|null, ApiError|null]> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)          
        })
        const data = await response.json()
        if (!response.ok) {
            return [null, { title: data.title, details: data.details }]
        }
        return [data, null]
    }, [])

    return { login }
}