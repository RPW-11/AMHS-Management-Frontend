"use client";
import LoadingSpinner from "@/components/loading-spinner";
import { MissionCategory, MissionStatus } from "@/constants/mission";
import { useLoadDetailedMission } from "@/hooks/mission/useLoadDetailedMission";
import { useParams, useRouter } from "next/navigation";
import RoutePlanningSummarySection from "./route-planning-detail";
import { Button } from "@/components/ui/button";
import { Routes, ToolCaseRoutes } from "@/constants/general";
import MissionMetadata from "./mission-metadata";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import MissionDescription from "@/components/mission/mission-description";
import { Trans, useTranslation } from "react-i18next";

const MissionDetailPage = () => {
    const { missionId } = useParams();
    const { mission, isLoading, isFetching, error } = useLoadDetailedMission(
        typeof missionId === "string" ? missionId : undefined,
    );
    const { push } = useRouter();
    const { t } = useTranslation();

    if (isLoading || isFetching) {
        return (
            <div className="w-full h-full flex justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!mission || error) {
        return (
            <div className="w-full h-full flex justify-center">
                {t("missions.detail.notFound")}
            </div>
        );
    }

    return (
        <div className="rounded-md bg-white py-4 px-6 space-y-6">
            <Button size={"sm"} onClick={() => push(Routes.Missions)}>
                {t("missions.detail.back")}
            </Button>
            <h1 className="font-medium text-xl">{mission.name}</h1>
            <MissionMetadata mission={mission} />

            <div className="space-y-4">
                <Label>{t("missions.detail.description")}</Label>
                <MissionDescription mission={mission}/>
            </div>

            {mission.category === MissionCategory.RoutePlanning && (
                <div className="py-4 space-y-4">
                    <Label>{t("missions.detail.detail")}</Label>
                    {mission.routePlanningSummary && mission.status == MissionStatus.Finished ? (
                        <RoutePlanningSummarySection
                            missionId={mission.id}
                            routePlanningSumarry={mission.routePlanningSummary}
                        />
                    ) :
                    mission.status === MissionStatus.Processing ?
                    (
                        <div className="bg-gray-100 text-sm p-2 rounded-md text-muted-foreground">
                            {t("missions.detail.processing")}
                        </div>
                    )
                    :
                    (
                        <div className="bg-gray-100 text-sm p-2 rounded-md text-muted-foreground">
                            <Trans
                                i18nKey="missions.detail.noRouteConfigured"
                                components={{
                                    rgvLink: (
                                        <Link
                                            href={ToolCaseRoutes.RgvRoutePlanning(
                                                mission.id,
                                            )}
                                            className="text-blue-500 hover:underline"
                                        />
                                    ),
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MissionDetailPage;
