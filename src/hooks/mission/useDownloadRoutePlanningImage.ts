import { useUserStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { UnauthorizedError, useUnauthorized } from "../useUnauthorized";

export const useDownloadRoutePlanningImage = () => {
    const { user } = useUserStore();
    const { t } = useTranslation();
    const handleUnauthorized = useUnauthorized();

    return useMutation({
        mutationFn: async (missionId: string) => {
            if (!user?.token) handleUnauthorized(t("missions.detail.routePlanning.downloadErrors.unauthorized"));

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}/route-planning/image`,
                {
                    headers: { Authorization: `Bearer ${user?.token}` },
                },
            );

            if (response.status === 401) {
                handleUnauthorized(t("missions.detail.routePlanning.downloadErrors.unauthorized"));
            }

            if (!response.ok) {
                throw new Error(t("missions.detail.routePlanning.downloadErrors.downloadFailed"));
            }

            const { url } = await response.json() as { url: string };

            const link = document.createElement("a");
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        onError: (err) => {
            if (err instanceof UnauthorizedError) return;
            toast.error((err as Error).message);
        },
    });
};
