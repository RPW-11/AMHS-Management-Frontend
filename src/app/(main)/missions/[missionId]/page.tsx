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

const MissionDetailPage = () => {
    const { missionId } = useParams();
    const { mission, isLoading, isFetching, error } = useLoadDetailedMission(
        typeof missionId === "string" ? missionId : undefined,
    );
    const { push } = useRouter();

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
                <MissionDescription mission={mission}/>
            </div>

            {mission.category === MissionCategory.RoutePlanning && (
                <div className="py-4 space-y-4">
                    <Label>Mission Detail</Label>
                    {mission.routePlanningSummary && mission.resourceLink ? (
                        <RoutePlanningSummarySection
                            resourceLink={mission.resourceLink}
                            routePlanningSumarry={mission.routePlanningSummary}
                        />
                    ) : 
                    mission.status === MissionStatus.Processing ?
                    (
                        <div className="bg-gray-100 text-sm p-2 rounded-md text-muted-foreground">
                            This mission is still being processed
                        </div>
                    )
                    :
                    (
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
