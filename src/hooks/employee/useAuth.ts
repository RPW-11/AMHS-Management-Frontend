"use client"

import { useUserStore } from "@/stores/useAuthStore"
import { LoginRequest } from "@/types/employee"
import { ApiError } from "@/types/general"
import { useCallback } from "react"

export const useAuth = () => {
    const { setIsAuthenticated, setUser } = useUserStore()

    const login = useCallback(async (loginRequest: LoginRequest): Promise<ApiError|null> => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)          
        })
        const data = await response.json()
        if (!response.ok) {
            return { title: data.title, details: data.details }
        }

        setIsAuthenticated(true)
        setUser({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            imgUrl: data.imgUrl || null,
            position: data.position,
            token: data.token
        })

        return null
    }, [])

    return { login }
}