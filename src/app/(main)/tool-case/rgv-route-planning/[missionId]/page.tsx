"use client";
import ImageGridOverlay from "@/components/tool-case/image-grid-overlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MissionRoutes } from "@/constants/general";
import { ROUTE_PLANNING_ALGORITHMS, RoutePlanningAlgorithm } from "@/constants/tool-case";
import { useRgvRouteSolver } from "@/hooks/tool-case/useRgvRouteSolver";
import { createRoutePlanningFormStore } from "@/stores/useRoutePlanningFormStore";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";

const RgvRoutePlanningPage = () => {
    const { submitRgvRoutePlan } = useRgvRouteSolver();
    const { push } = useRouter();
    const { missionId } = useParams();

    const useFormStore = useMemo(
        () => createRoutePlanningFormStore(missionId as string),
        [missionId]
    )
    const { form, setForm, resetForm } = useFormStore()
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({ image: file});
        }
    };

    const handleRowDimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ rowDim: Number(e.target.value) });
    };

    const handleColDimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ colDim: Number(e.target.value) });
    };

    const handleWidthLengthChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setForm({ widthLength: Number(e.target.value) });
    };

    const handleHeightLengthChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setForm({ heightLength: Number(e.target.value) });
    };

    const handleChangeAlgorithm = (algorithm: RoutePlanningAlgorithm) =>
        setForm({ algorithm: algorithm });

    const getAlgorithmCardStyle = (algoName: string): string => {
        if (algoName === form.algorithm) {
            return "border-primary bg-accent text-primary";
        }
        return "hover:bg-gray-100";
    };

    const isAbleToProceed = (): boolean => {
        return (
            form.algorithm !== "" &&
            form.rowDim > 0 &&
            form.colDim > 0 &&
            form.image !== null &&
            form.points.length > 0 &&
            form.stationsOrder.length > 1
        );
    };

    const handleSubmitRgvPlan = async () => {
        if (!form.image || !missionId)
            throw new Error("Image or missionId cannot be empty");

        const error = await submitRgvRoutePlan(
            { image: form.image, routeMetaData: { ...form } },
            missionId.toString(),
        );

        if (error) {
            throw new Error(error.title);
        }
    };

    const handleSubmitRgvPlanWithToast = () => {
        if (!missionId) return;
        toast.promise(handleSubmitRgvPlan, {
            success: () => {
                resetForm()
                push(MissionRoutes.Detail(missionId.toString()));
                return "The route has been solved!";
            },
            loading: "Solving the route. This may take a while...",
            error: (err) => (err as Error).message,
        });
    };

    return (
        <div className="bg-white rounded-md p-4 border space-y-4">
            <div>
                <h1 className="font-bold text-lg">RGV Route Planning</h1>
                <p className="text-muted-foreground text-sm">
                    Find the some routes that are most efficient for your RGV
                    system{" "}
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                    <Label>Upload layout image</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Row dimension</Label>
                    <Input
                        type="number"
                        value={form.rowDim}
                        onChange={handleRowDimChange}
                    />
                    <p className="text-xs text-muted-foreground">
                        Bigger row dimension will yield to more computation
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Column dimension</Label>
                    <Input
                        type="number"
                        value={form.colDim}
                        onChange={handleColDimChange}
                    />
                    <p className="text-xs text-muted-foreground">
                        Bigger column dimension will yield to more computation
                    </p>
                </div>

                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Width length</Label>
                    <Input
                        type="number"
                        value={form.widthLength}
                        onChange={handleWidthLengthChange}
                    />
                    <p className="text-xs text-muted-foreground">
                        The actual width length in meter
                    </p>
                </div>
                <div className="col-span-2 lg:col-span-1 space-y-2">
                    <Label>Height length</Label>
                    <Input
                        type="number"
                        value={form.heightLength}
                        onChange={handleHeightLengthChange}
                    />
                    <p className="text-xs text-muted-foreground">
                        The actual height length in meter
                    </p>
                </div>

                <div className="col-span-2 space-y-2">
                    <Label>Algorithms</Label>
                    <div className="grid grid-cols-3 gap-2">
                        {ROUTE_PLANNING_ALGORITHMS.map((algo) => (
                            <Label
                                key={algo.name}
                                className={`col-span-3 lg:col-span-1 p-4 rounded-md border items-start cursor-pointer ${getAlgorithmCardStyle(algo.value)}`}
                                onClick={() => handleChangeAlgorithm(algo.value)}
                            >
                                <div className="space-y-1 font-normal">
                                    <h3 className="font-medium">{algo.name}</h3>
                                    <p className="text-muted-foreground text-sm">
                                        {algo.description}
                                    </p>
                                </div>
                            </Label>
                        ))}
                    </div>
                </div>
            </div>
            {form.image && (
                <ImageGridOverlay
                    rgvPathPlan={{ ...form }}
                    onChangePlan={setForm}
                />
            )}
            <div className="flex justify-end">
                <Button
                    disabled={!isAbleToProceed()}
                    onClick={handleSubmitRgvPlanWithToast}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default RgvRoutePlanningPage;
