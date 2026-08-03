import { useUserStore } from "@/stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UnauthorizedError, useUnauthorized } from "../useUnauthorized";

export const useDeleteMission = () => {
    const queryClient = useQueryClient();
    const { user } = useUserStore();
    const handleUnauthorized = useUnauthorized();

    return useMutation({
        mutationFn: async (missionId: string) => {
            if (!user?.token) handleUnauthorized();

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${user?.token}` },
                },
            );

            if (response.status === 401) {
                handleUnauthorized();
            }

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.title || "Delete failed");
            }

            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ 
                predicate: (query) => {
                    const queryKey = query.queryKey;
                    return (
                        queryKey[0] === 'missions' ||
                        queryKey[0] === 'mission'
                    );
                } 
            });
            toast.success("Mission deleted");
        },
        onMutate: () => toast.loading("Deleting mission..."),
        onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
        onError: (err) => {
            if (err instanceof UnauthorizedError) return;
            toast.error((err as Error).message);
        },
    });
};
