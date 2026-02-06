import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useDeleteBulkMissions = (
    onDelete: () => void
) => {
    const queryClient = useQueryClient();
    const { user } = useUserStore();
    const { push } = useRouter();

    return useMutation({
        mutationFn: async (missionIds: string[]) => {
            if (!user?.token) throw new Error("Unauthorized");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions`,
                {
                    method: "DELETE",
                    headers: { 
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        missionIds
                    })
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
        onSuccess: (_, missionIds) => {
            queryClient.invalidateQueries({ queryKey: ["missions"] });
            toast.success(`${missionIds.length} missions have been deleted`);
            onDelete()
        },
        onMutate: (missionIds) => toast.loading(`Deleting ${missionIds.length} missions...`),
        onSettled: (_, __, ___, toastId) => toast.dismiss(toastId),
        onError: (err) => toast.error((err as Error).message),
    });
};
