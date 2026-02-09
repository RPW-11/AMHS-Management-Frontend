import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useMarkAsReadNotification = () => {
    const { user } = useUserStore();
    const { push } = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (notificationId: string) => {
            if (!user?.token) throw new Error("Unauthorized");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/notifications/${notificationId}/mark-as-read`,
                {
                    method: "PATCH",
                    headers: { Authorization: `Bearer ${user.token}` },
                },
            );

            if (response.status === 401) {
                push(Routes.Login);
                throw new Error("Unauthorized");
            }

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.title || "Update failed");
            }

            return null;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
        onError: (err) => toast.error((err as Error).message),
    });
};
