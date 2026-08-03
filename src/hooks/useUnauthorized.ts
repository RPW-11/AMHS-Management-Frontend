"use client";

import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export class UnauthorizedError extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = "UnauthorizedError";
    }
}

export const useUnauthorized = () => {
    const { logout } = useUserStore();
    const { push } = useRouter();
    const queryClient = useQueryClient();

    return useCallback(
        (message?: string): never => {
            logout();
            queryClient.clear();
            push(Routes.Login);
            throw new UnauthorizedError(message);
        },
        [logout, queryClient, push],
    );
};
