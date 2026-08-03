"use client"

import { useUserStore } from "@/stores/useAuthStore"
import { EmployeeSearch } from "@/types/employee"
import { useCallback, useEffect, useState } from "react"
import { useDebouncedCallback } from 'use-debounce';
import { UnauthorizedError, useUnauthorized } from "../useUnauthorized";

export const useSearchEmployeesByName = () => {
    const { user, isHydrated } = useUserStore();
    
    const handleUnauthorized = useUnauthorized()
    const [employees, setEmployess] = useState<EmployeeSearch[]>([])
    const [searchedName, setSearchedName] = useState<string>("")
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [fetchError, setFetchError] = useState<string | null>(null)
    
    const fetchEmployeesByName = useCallback(async (name: string) => {
        if (!name.trim()) {
            setEmployess([])
            setFetchError(null)
            setIsFetching(false)
            return
        }

        setIsFetching(true)
        setFetchError(null)

        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/employees/search?name=${encodeURIComponent(name)}`, {
                headers: {
                    'Authorization': `Bearer ${user?.token}`
                }
            })

            if (result.status === 401) {
                handleUnauthorized()
            }

            const data = await result.json()

            if(!result.ok) {
                return setFetchError(data.title ?? 'Failed to fetch employees')
            }

            setEmployess(data)
        } catch (error) {
            if (error instanceof UnauthorizedError) return
            setFetchError((error as Error).message)
        } finally {
            setIsFetching(false)
        }
    }, [user?.token, handleUnauthorized])

    const debouncedFetchEmployeesByName = useDebouncedCallback((name: string) => fetchEmployeesByName(name), 400)

    useEffect(() => {
        if (isHydrated) {
            debouncedFetchEmployeesByName(searchedName)
        }
    }, [isHydrated, searchedName, debouncedFetchEmployeesByName])
    
    return {
        employees,
        fetchError,
        isFetching,
        searchedName,
        setSearchedName
    };
}