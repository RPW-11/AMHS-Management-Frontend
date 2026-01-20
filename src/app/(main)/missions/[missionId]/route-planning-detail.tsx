import SelectOption from "@/components/select-option";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Option } from "@/types/general";
import { RoutePlanningSummary } from "@/types/mission";
import { Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface RoutePlanningSummaryProps {
    routePlanningSumarry: RoutePlanningSummary;
    resourceLink: string;
}
const RoutePlanningSummarySection = ({
    routePlanningSumarry,
    resourceLink,
}: RoutePlanningSummaryProps) => {
    const solutions: Option[] = [
        { name: "Solution 1", value: "1" },
        { name: "Solution 2", value: "2" },
    ]

    const imageUrls = [`data:image/jpeg;base64,${routePlanningSumarry.imageUrls[0]}`, `data:image/jpeg;base64,${routePlanningSumarry.imageUrls[1]}`];
    const [currSolution, setCurrSolution] = useState<Option>(solutions[0])

    return (
        <div className="space-y-6 text-sm">
            <div className="grid grid-cols-2 gap-4 w-4/5 lg:w-1/4 items-center">
                <div className="col-span-1">Detailed JSON File</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary whitespace-nowrap">
                    {resourceLink}
                </div>
                <div className="col-span-1">Algorithm</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary whitespace-nowrap">
                    {routePlanningSumarry.algorithm}
                </div>
                <div className="col-span-1">Row Dimension</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary whitespace-nowrap">
                    {routePlanningSumarry.rgvMap.rowDim}
                </div>
                <div className="col-span-1">Column Dimension</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary whitespace-nowrap">
                    {routePlanningSumarry.rgvMap.colDim}
                </div>
                <div className="col-span-1">Actual Width Length</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary whitespace-nowrap">
                    {routePlanningSumarry.rgvMap.widthLength} meter
                </div>
                <div className="col-span-1">Actual Height Length</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary whitespace-nowrap">
                    {routePlanningSumarry.rgvMap.heightLength} meter
                </div>
                <div className="col-span-1">Total Throughput</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary whitespace-nowrap">
                    {`${Math.floor(routePlanningSumarry.score.throughput)} products per hour`}
                </div>
                <div className="col-span-1">Track Length</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary">
                    {`${routePlanningSumarry.score.trackLength} meter`}
                </div>
                <div className="col-span-1">Maximum Number of RGVs</div>
                <div className="col-span-1 rounded-md bg-accent py-1 px-3 w-fit text-primary">
                    {`${routePlanningSumarry.score.numOfRgvs} rgvs`}
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-end gap-2">
                    <div className="w-48">
                        <SelectOption
                            value={currSolution}
                            options={solutions}
                            onValueChange={(op) => setCurrSolution(op)}
                            labelName={"Solution"}
                            placeholder={"Choose solution"}
                        />
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={"icon-sm"} variant={"outline"}>
                                <Download />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent align="end">Download image</TooltipContent>
                    </Tooltip>
                </div>
                <Image
                    src={currSolution.value === "1" ? imageUrls[0] : imageUrls[1]}
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
