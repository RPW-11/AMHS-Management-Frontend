"use client"
import { EmployeeRoutes, Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { EmployeePosition } from "@/types/employee";
import { getPositionEnumByStr } from "@/utils/employee/employee-util";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useRoleRestriction() {
    const protectedRoutes = new Map<string, EmployeePosition[]>([
        [EmployeeRoutes.Add, [EmployeePosition.Manager, EmployeePosition.Supervisor]],

    ])

    const pathname = usePathname()
    const { user } = useUserStore()
    const { push } = useRouter()
    const [loadingVerification, setLoadingVerification] = useState<boolean>(true)

    useEffect(() => {
        if(protectedRoutes.has(pathname)) {
            if(!user) {return}
            var exist = protectedRoutes.get(pathname)?.includes(getPositionEnumByStr(user.position))
            
            if(!exist) {
                setLoadingVerification(false)
                return push(Routes.NotFound)
            }
            
            setLoadingVerification(false)
        }
    }, [user])

    return { loadingVerification }
}