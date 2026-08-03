import { useUserStore } from "@/stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UnauthorizedError, useUnauthorized } from "../useUnauthorized";

export const useMarkAsReadNotification = () => {
    const { user } = useUserStore();
    const handleUnauthorized = useUnauthorized();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (notificationId: string) => {
            if (!user?.token) handleUnauthorized();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/notifications/${notificationId}/mark-as-read`,
                {
                    method: "PATCH",
                    headers: { Authorization: `Bearer ${user?.token}` },
                },
            );

            if (response.status === 401) {
                handleUnauthorized();
            }

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.title || "Update failed");
            }

            return null;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
        onError: (err) => {
            if (err instanceof UnauthorizedError) return;
            toast.error((err as Error).message);
        },
    });
};
