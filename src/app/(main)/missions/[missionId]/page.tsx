"use client"

import LoadingSpinner from "@/components/loading-spinner";
import MissionCategoryBadge from "@/components/mission/mission-category-badge";
import { MissionCategory } from "@/constants/mission";
import { useLoadDetailedMission } from "@/hooks/mission/useLoadDetailedMission";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import RoutePlanningSummarySection from "./route-planning-detail";
import { Button } from "@/components/ui/button";
import { Routes } from "@/constants/general";

const MissionDetailPage = () => {
    const { missionId } = useParams();
    const { fetchMissionById, isFetchingMission, mission} = useLoadDetailedMission();
    const { push } = useRouter();

    useEffect(() => {
        if (missionId) {
            const fetchMission = () => fetchMissionById(missionId.toString())
            fetchMission()
        }
    }, [missionId])

    if (isFetchingMission) {
        return (
            <div className="w-full h-full flex justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (!mission) {
        return (
            <div className="w-full h-full flex justify-center">
                Mission is not found
            </div>
        )
    }

    return (
        <div className="rounded-md bg-white p-4 space-y-4">
            <Button size={"sm"} onClick={() => push(Routes.Missions)}>Back</Button>
            <div className="flex justify-between gap-4">
                <div>
                    <h1 className="font-semibold text-xl">
                        { mission.name }
                    </h1>
                    <p className="text-sm text-muted-foreground">{ mission.description }</p>
                </div>
                <MissionCategoryBadge category={mission.category} />
            </div>
            {mission.category === MissionCategory.RoutePlanning
            &&
            mission.routePlanningSummary
            &&
            mission.resourceLink
            &&
            <div className="py-4">
                <RoutePlanningSummarySection resourceLink={mission.resourceLink} routePlanningSumarry={mission.routePlanningSummary}/>
            </div>
            }
        </div>
    );
}
 
export default MissionDetailPage;