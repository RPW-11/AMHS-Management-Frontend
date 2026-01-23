"use client";

import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { PaginatedResponse } from "@/types/general";
import { Mission } from "@/types/mission";
import { useRouter } from "next/navigation";
import { usePagination } from "../usePagination";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useLoadMission = () => {
    const { user, isHydrated } = useUserStore();
    const { push } = useRouter();
    const { page, pageSize, setPage, getSearchParamValue } = usePagination();

    const status = getSearchParamValue("status")

    const { data, isLoading, isFetching, error, refetch } = useQuery<
        PaginatedResponse<Mission>
    >({
        queryKey: ["missions", page, pageSize, status],
        queryFn: async () => {
            if (!user?.token) {
                push(Routes.Login);
                throw new Error("Unauthorized");
            }
            
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions?page=${page}&pageSize=${pageSize}${status ? `&status=${status}` : ""}`,
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

    useEffect(() => {
        if (isLoading || isFetching || error || !data) return;

        if (missions.length === 0 && page > 1) {
            const targetPage = Math.max(1, page - 1);
            setPage(targetPage);
        }
    }, [missions.length, page, isLoading, isFetching, error, data, setPage]);

    return {
        missions,
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
};
