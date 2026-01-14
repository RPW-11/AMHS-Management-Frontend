"use client"
import ImageGridOverlay from "@/components/tool-case/image-grid-overlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MissionRoutes } from "@/constants/general";
import { DEFAULT_RGV_PLAN, ROUTE_PLANNING_ALGORITHMS } from "@/constants/tool-case";
import { useRgvRouteSolver } from "@/hooks/tool-case/useRgvRouteSolver";
import { RgvPathPlan } from "@/types/toolcase";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const RgvRoutePlanningPage = () => {
    const [rgvPlan, setRgvPlan] = useState<RgvPathPlan>(DEFAULT_RGV_PLAN)

    const { submitRgvRoutePlan } = useRgvRouteSolver();
    const { push } = useRouter()
    const { missionId } = useParams();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setRgvPlan(prev => ({...prev, image: file }));
        }
    };

    const handleRowDimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRgvPlan(prev => ({...prev, rowDim: Number(e.target.value)}))
    }

    const handleColDimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRgvPlan(prev => ({...prev, colDim: Number(e.target.value)}))
    }

    const handleWidthLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRgvPlan(prev => ({...prev, widthLength: Number(e.target.value)}))
    }

    const handleHeightLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRgvPlan(prev => ({...prev, heightLength: Number(e.target.value)}))
    }

    const getAlgorithmCardStyle = (algoName: string): string => {
        if (algoName === rgvPlan.algorithm) {
            return "border-primary bg-accent text-primary"
        }
        return "hover:bg-gray-100"
    }

    const isAbleToProceed = (): boolean => {
        return rgvPlan.algorithm !== "" && rgvPlan.rowDim > 0 && rgvPlan.colDim > 0 &&  rgvPlan.image !== null && rgvPlan.points.length > 0 && rgvPlan.stationsOrder.length > 1
    }

    const handleSubmitRgvPlan = async() => {
        if (!rgvPlan.image || !missionId) throw new Error("Image or missionId cannot be empty")
        const error = await submitRgvRoutePlan({ image: rgvPlan.image, routeMetaData: {...rgvPlan} }, missionId.toString())
        if (error) {
            console.log(error);
            throw new Error(error.title)
        }
    }

    const handleSubmitRgvPlanWithToast = () => {
        if (!missionId) return
        toast.promise(handleSubmitRgvPlan, {
            success: () => {
                push(MissionRoutes.Detail(missionId.toString()));
                return "The route has been solved!"
            },
            loading: "Solving the route. This may take a while...",
            error: (err) => (err as Error).message
        })
    }   

    return(
        <div className="bg-white rounded-md p-4 border space-y-4">
            <div>
                <h1 className="font-bold text-lg">RGV Route Planning</h1>
                <p className="text-muted-foreground text-sm">Find the some routes that are most efficient for your RGV system </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                    <Label>Upload layout image</Label>
                    <Input type="file" accept="image/*" onChange={handleImageUpload}/>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Row dimension</Label>
                    <Input type="number" value={rgvPlan.rowDim} onChange={handleRowDimChange}/>
                    <p className="text-xs text-muted-foreground">Bigger row dimension will yield to more computation</p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Column dimension</Label>
                    <Input type="number" value={rgvPlan.colDim} onChange={handleColDimChange}/>
                    <p className="text-xs text-muted-foreground">Bigger column dimension will yield to more computation</p>
                </div>

                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Width length</Label>
                    <Input type="number" value={rgvPlan.widthLength} onChange={handleWidthLengthChange}/>
                    <p className="text-xs text-muted-foreground">The actual width length in meter</p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Height length</Label>
                    <Input type="number" value={rgvPlan.heightLength} onChange={handleHeightLengthChange}/>
                    <p className="text-xs text-muted-foreground">The actual height length in meter</p>
                </div>
                
                <div className="col-span-2 space-y-2">
                    <Label>Algorithms</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {ROUTE_PLANNING_ALGORITHMS.map(algo => (
                            <Label key={algo.name} className={`col-span-3 lg:col-span-1 p-4 rounded-md border items-start cursor-pointer ${getAlgorithmCardStyle(algo.value)}`} onClick={() => setRgvPlan(prev => ({...prev, algorithm: algo.value}))}>
                                <div className="space-y-1 font-normal">
                                    <h3 className="font-medium">{ algo.name }</h3>
                                    <p className="text-muted-foreground text-sm">
                                        { algo.description }
                                    </p>
                                </div>
                            </Label>
                        ))}
                    </div>
                </div>
            </div>
            {rgvPlan.image && <ImageGridOverlay rgvPathPlan={{ ...rgvPlan, image: rgvPlan.image}} onChangePlan={setRgvPlan}/>}
            <div className="flex justify-end">
                <Button disabled={!isAbleToProceed()} onClick={handleSubmitRgvPlanWithToast}>Submit</Button>
            </div>
        </div>
    )
}

export default RgvRoutePlanningPage