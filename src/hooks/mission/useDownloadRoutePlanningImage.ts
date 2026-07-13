import { Routes } from "@/constants/general";
import { useUserStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const useDownloadRoutePlanningImage = () => {
    const { user } = useUserStore();
    const { push } = useRouter();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: async (missionId: string) => {
            if (!user?.token) throw new Error(t("missions.detail.routePlanning.downloadErrors.unauthorized"));

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_HOST}/missions/${missionId}/route-planning/image`,
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                },
            );

            if (response.status === 401) {
                push(Routes.Login);
                throw new Error(t("missions.detail.routePlanning.downloadErrors.unauthorized"));
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
        onError: (err) => toast.error((err as Error).message),
    });
};
