"use client";

import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { PaginatedResponse } from "@/types/general";
import { Mission } from "@/types/mission";
import { useRouter } from "next/navigation";
import { usePagination } from "../usePagination";
import { useQuery } from "@tanstack/react-query";

export const useLoadMission = () => {
    const { user, isHydrated } = useUserStore();
    const { push } = useRouter();
    const { page, pageSize } = usePagination();

    const { data, isLoading, error, refetch } = useQuery<
        PaginatedResponse<Mission>
    >({
        queryKey: ["missions", page, pageSize],
        queryFn: async () => {
            if (!user?.token) {
                push(Routes.Login);
                throw new Error("Unauthorized");
            }
            
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions?page=${page}&pageSize=${pageSize}`,
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

    const missions = data?.items ?? [];
    const totalCount = data?.totalCount ?? 0;
    const totalPages = data?.totalPages ?? 0;
    const hasNext = data?.hasNext ?? false;
    const hasPrevious = data?.hasPrevious ?? false;

    return {
        missions,
        isFetchingMissions: isLoading,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNext,
        hasPrevious,
        error,
        refresh: refetch,
    };
};
