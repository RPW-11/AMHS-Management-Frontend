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
    const { user, isHydrated } = useUserStore()
    const { push } = useRouter()
    const [loadingVerification, setLoadingVerification] = useState<boolean>(true)

    useEffect(() => {
        if (!protectedRoutes.has(pathname)) {
            setLoadingVerification(false)
            return
        }

        if (!isHydrated) return

        setLoadingVerification(true)

        if (!user) {
            push(Routes.Login);
            return;
        }

        const allowedPositions = protectedRoutes.get(pathname)

        if (!Array.isArray(allowedPositions)) {
            console.warn(`Invalid route config for ${pathname}`)
            push(Routes.NotFound);
            return;
        }

        const userPosition = getPositionEnumByStr(user.position);

        if (!allowedPositions.includes(userPosition)) {
            push(Routes.NotFound);
            return;
        }

        setLoadingVerification(false);

    }, [user, pathname, isHydrated, push])

    return { loadingVerification }
}