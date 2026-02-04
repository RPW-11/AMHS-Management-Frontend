"use client";

import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { NotificationData, PaginatedResponse } from "@/types/general";
import { useRouter } from "next/navigation";
import { usePagination } from "../usePagination";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useLoadNotification = () => {
    const { user, isHydrated } = useUserStore();
    const { push } = useRouter();
    const { page, pageSize, setPage } = usePagination();

    const { data, isLoading, isFetching, error, refetch } = useQuery<
        PaginatedResponse<NotificationData>
    >({
        queryKey: ["notifications", page, pageSize],
        queryFn: async () => {
            if (!user?.token) {
                push(Routes.Login);
                throw new Error("Unauthorized");
            }
            
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/notifications?page=${page}&pageSize=${pageSize}`,
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

    const notifications = data?.items ?? [];
    const totalCount = data?.totalCount ?? 0;
    const totalPages = data?.totalPages ?? 0;
    const hasNext = data?.hasNext ?? false;
    const hasPrevious = data?.hasPrevious ?? false;

    useEffect(() => {
        if (isLoading || isFetching || error || !data) return;

        if (notifications.length === 0 && page > 1) {
            const targetPage = Math.max(1, page - 1);
            setPage(targetPage);
        }
    }, [notifications.length, page, isLoading, isFetching, error, data, setPage]);

    return {
        notifications,
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
