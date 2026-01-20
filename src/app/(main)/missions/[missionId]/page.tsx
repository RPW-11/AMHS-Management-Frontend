"use client";
import LoadingSpinner from "@/components/loading-spinner";
import { MissionCategory } from "@/constants/mission";
import { useLoadDetailedMission } from "@/hooks/mission/useLoadDetailedMission";
import { useParams, useRouter } from "next/navigation";
import RoutePlanningSummarySection from "./route-planning-detail";
import { Button } from "@/components/ui/button";
import { Routes, ToolCaseRoutes } from "@/constants/general";
import MissionMetadata from "./mission-metadata";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const MissionDetailPage = () => {
    const { missionId } = useParams();
    const { isFetchingMission, mission } = useLoadDetailedMission(
        typeof missionId === "string" ? missionId : undefined,
    );
    const { push } = useRouter();

    if (isFetchingMission) {
        return (
            <div className="w-full h-full flex justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!mission) {
        return (
            <div className="w-full h-full flex justify-center">
                Mission is not found
            </div>
        );
    }

    return (
        <div className="rounded-md bg-white py-4 px-6 space-y-6">
            <Button size={"sm"} onClick={() => push(Routes.Missions)}>
                Back
            </Button>
            <h1 className="font-medium text-xl">{mission.name}</h1>
            <MissionMetadata mission={mission} />

            <div className="space-y-4">
                <Label>Mission Description</Label>
                <div className="p-2 bg-gray-100 rounded-md w-full">
                    {mission.description ? (
                        <p className="text-sm text-muted-foreground">
                            {mission.description}
                        </p>
                    ) : (
                        <p className="text-sm italic text-center text-muted-foreground">
                            No description
                        </p>
                    )}
                </div>
            </div>

            {mission.category === MissionCategory.RoutePlanning && (
                <div className="py-4 space-y-4">
                    <Label>Mission Detail</Label>
                    {mission.routePlanningSummary && mission.resourceLink ? (
                        <RoutePlanningSummarySection
                            resourceLink={mission.resourceLink}
                            routePlanningSumarry={mission.routePlanningSummary}
                        />
                    ) : (
                        <div className="bg-gray-100 text-sm p-2 rounded-md text-muted-foreground">
                            This mission has no route configured, click{" "}
                            <Link
                                href={ToolCaseRoutes.RgvRoutePlanning(
                                    mission.id,
                                )}
                                className="text-blue-500 hover:underline"
                            >
                                here
                            </Link>{" "}
                            to solve one.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MissionDetailPage;
