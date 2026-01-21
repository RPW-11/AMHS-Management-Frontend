"use client"
import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import LoadingSpinner from "./loading-spinner";

const ProtectedRouteWrapper = ({ children }: { children: ReactNode }) => {
    const { isHydrated, isAuthenticated } = useUserStore()
    const { push } = useRouter()

    useEffect(() => {
        if (isHydrated && !isAuthenticated) {
            push(Routes.Login)
        }
    }, [isHydrated, isAuthenticated, push])

    if (!isHydrated) {
        return (
            <div className="flex justify-center w-full">
                <LoadingSpinner/> 
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <>{ children }</>
    );
}
 
export default ProtectedRouteWrapper;