"use client"

import { Routes } from "@/constants/general"
import { useUserStore } from "@/stores/useAuthStore"
import { Employee } from "@/types/employee"
import { useRouter } from "next/navigation"
import { usePagination } from "../usePagination"
import { useQuery } from "@tanstack/react-query"
import { PaginatedResponse } from "@/types/general"

export const useEmployee = () => {
    const { user, isHydrated } = useUserStore();
    const { push } = useRouter();
    const { page, pageSize } = usePagination();

    const { data, isLoading, isFetching, error, refetch } = useQuery<
        PaginatedResponse<Employee>
    >({
        queryKey: ["employees", page, pageSize],
        queryFn: async () => {
            if (!user?.token) {
                push(Routes.Login);
                throw new Error("Unauthorized");
            }
            
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/employees?page=${page}&pageSize=${pageSize}`,
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );

            if (response.status === 401) {
                push(Routes.Login);
                throw new Error("Unauthorized");
            }

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.title || "Fetch failed");
            }

            return response.json();
        },
        enabled: isHydrated && !!user?.token,
    });

    const employees = data?.items ?? [];
    const totalCount = data?.totalCount ?? 0;
    const totalPages = data?.totalPages ?? 0;
    const hasNext = data?.hasNext ?? false;
    const hasPrevious = data?.hasPrevious ?? false;
    
    return {
        employees,
        isLoading,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNext,
        hasPrevious,
        error,
        isFetching,
        refresh: refetch,
    };
}