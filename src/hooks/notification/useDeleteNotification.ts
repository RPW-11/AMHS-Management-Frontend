import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    const { user } = useUserStore();
    const { push } = useRouter();

    return useMutation({
        mutationFn: async (notificationId: string) => {
            if (!user?.token) throw new Error("Unauthorized");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/notifications/${notificationId}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${user.token}` },
                },
            );

            if (response.status === 401) {
                push(Routes.Login);
                throw new Error("Unauthorized");
            }

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.title || "Delete failed");
            }

            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            toast.success("Notification deleted");
        },
        onError: (err) => toast.error((err as Error).message),
    });
};
