import SelectOption from "@/components/select-option";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Option } from "@/types/general";
import { RoutePlanningSummary } from "@/types/mission";
import { Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDownloadRoutePlanningImage } from "@/hooks/mission/useDownloadRoutePlanningImage";
import LoadingSpinner from "@/components/loading-spinner";

interface RoutePlanningSummaryProps {
    missionId: string;
    routePlanningSumarry: RoutePlanningSummary;
}
const RoutePlanningSummarySection = ({
    missionId,
    routePlanningSumarry
}: RoutePlanningSummaryProps) => {
    const { t } = useTranslation();
    const { mutate: downloadImage, isPending: isDownloading } = useDownloadRoutePlanningImage();
    const solutions: Option[] = [
        { name: t("missions.detail.routePlanning.solutionName", { num: 1 }), value: "1" },
    ]

    const [currSolution, setCurrSolution] = useState<Option>(solutions[0])

    return (
        <div className="space-y-6 text-sm">
            <div className="grid grid-cols-2 gap-4 w-4/5 lg:w-1/4 items-center">
                <div className="col-span-1">{t("missions.detail.routePlanning.algorithm")}</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary whitespace-nowrap">
                    {routePlanningSumarry.algorithm}
                </div>
                <div className="col-span-1">{t("missions.detail.routePlanning.rowDimension")}</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary whitespace-nowrap">
                    {routePlanningSumarry.rgvMap.rowDim}
                </div>
                <div className="col-span-1">{t("missions.detail.routePlanning.columnDimension")}</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary whitespace-nowrap">
                    {routePlanningSumarry.rgvMap.colDim}
                </div>
                <div className="col-span-1">{t("missions.detail.routePlanning.actualWidthLength")}</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary whitespace-nowrap">
                    {t("missions.detail.routePlanning.meter", { value: routePlanningSumarry.rgvMap.widthLength })}
                </div>
                <div className="col-span-1">{t("missions.detail.routePlanning.actualHeightLength")}</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary whitespace-nowrap">
                    {t("missions.detail.routePlanning.meter", { value: routePlanningSumarry.rgvMap.heightLength })}
                </div>
                <div className="col-span-1">{t("missions.detail.routePlanning.totalThroughput")}</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary whitespace-nowrap">
                    {t("missions.detail.routePlanning.productsPerHour", { value: Math.floor(routePlanningSumarry.score.throughput) })}
                </div>
                <div className="col-span-1">{t("missions.detail.routePlanning.trackLength")}</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary">
                    {t("missions.detail.routePlanning.meter", { value: routePlanningSumarry.score.trackLength })}
                </div>
                <div className="col-span-1">{t("missions.detail.routePlanning.maxNumberOfRgvs")}</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary">
                    {t("missions.detail.routePlanning.rgvs", { value: routePlanningSumarry.score.numOfRgvs })}
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-end gap-2">
                    <div className="w-48">
                        <SelectOption
                            value={currSolution}
                            options={solutions}
                            onValueChange={(op) => setCurrSolution(op)}
                            labelName={t("missions.detail.routePlanning.solution")}
                            placeholder={t("missions.detail.routePlanning.chooseSolution")}
                        />
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size={"icon-sm"}
                                variant={"outline"}
                                disabled={isDownloading}
                                onClick={() => downloadImage(missionId)}
                            >
                                {isDownloading ? <LoadingSpinner size="sm" /> : <Download />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent align="end">{t("missions.detail.routePlanning.downloadImage")}</TooltipContent>
                    </Tooltip>
                </div>
                <Image
                    src={routePlanningSumarry.imageUrls[0]}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    alt="route-planning-resutlt-image"
                />
            </div>
        </div>
    );
};

export default RoutePlanningSummarySection;
